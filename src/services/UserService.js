const {User} = require("../models");
const UserRepository = require('../repositories/UserRepository');
const {errorMessages, httpCodes} = require("../errors/ExceptionErrors");
const {generateRandomPassword, generateRandomUsername, extractIpAddressFromHeader} = require('../utils/StringUtils');
const {extractToken} = require("../utils/JWTUtil");
const BadActionException = require('../errors/BadActionException');
const Unauthenticated = require('../errors/Unauthenticated');
const CountryService = require('../services/CountryService');
const jwt = require('jsonwebtoken');
const {auth, ipTrace} = require('../config/config');
const {differenceInMonths} = require("../utils/DateUtils");
const {traceIpAddress} = require("./external-services/IPTraceService");
const LeagueConstants = require('../constants/LeagueConstants');
const GenerateFiltersUtil = require('../utils/GenerateFiltersUtil');
const EntityMapper = require('./mapper/EntityMapper');
const UserDTO = require('./dtos/UserDTO');
const EntityNotFound = require('../errors/EntityNotFound');
const {FRIENDS} = require("../constants/LeaderboardTypeConstants");
const FriendshipRepository = require('../repositories/FriendshipRepository');
const AchievementService = require('./AchievementService');
const itemService = require('./ItemService');
const {Op} = require("sequelize");
const {GALAXY_1} = require("../constants/LeagueConstants");
const skinService = require('./SkinService');
const wallpaperService = require('./WallpaperService');
const bcrypt = require("bcrypt-nodejs");

module.exports = {
	async getOneByProviderIdOrEmail(req) {
		const {providerId, email} = req.body;
		let user = await UserRepository.findByProviderId(providerId);
		if (!user && email) {
			user = await UserRepository.findByEmail(email)
		}
		return user;
	},
	async setLastLogin(user) {
		user.last_login = new Date();
		await user.save();
	},
	async getOneByUsername(username) {
		return await UserRepository.findByUsername(username);
	},
	async handleAdminLogin(username,password) {
		const user = await UserRepository.findAdminByUsername(username);
		if(!user) {
			throw new EntityNotFound("User");
		}
		const verified = bcrypt.compareSync(password, user.password);
		if(!verified) {
			throw new Unauthenticated("Unauthenticated");
		}
		return user;
	},
	async getOneById(id) {
		const user = await UserRepository.findById(id);
		if (!user) {
			throw new EntityNotFound("User");
		}
		return user;
	},
	async generateUniqueUsername() {
		let username = generateRandomUsername();
		let user = await this.getOneByUsername(username);
		while (user != null) {
			username = generateRandomUsername()
			user = await this.getOneByUsername(username);
		}
		return username;
	},
	async setUserCountry(user, header) {
		try {
			const ipAddress = await extractIpAddressFromHeader(header);
			const isoCode = await traceIpAddress(ipAddress);
			const country = await CountryService.getOneByIsoCode(isoCode);
			user.country_id = country.id;
			user.save();
		} catch (e) {
			console.log(e);
			user.country_id = ipTrace.defaultCountryID
			user.save();
		}
	},
	createUser: async function (data, header) {
		const {providerId, email, providerType} = data;
		const username = await this.generateUniqueUsername();
		const user = await User.create({
			country_id: null,
			league_id: LeagueConstants.UNRANKED.id,
			username: username,
			provider_id: providerId,
			email: email ? email : null,
			password: generateRandomPassword(),
			provider_type: providerType
		});
		this.setAdditionalUserDataOnCreation(user, header);
		itemService.addInitialItemsToUser(user.id);
		return user;
	},
	setAdditionalUserDataOnCreation(user, header) {
		this.setUserCountry(user, header);
		AchievementService.createAchievementsForUser(user);
		skinService.createInitialUserSkins(user.id);
		wallpaperService.createUserWallpapers(user.id);
	},
	async getLoggedUser(bearerToken, isRefreshToken = false) {
		const token = extractToken(bearerToken);
		const secret = isRefreshToken ? auth.refreshJwtSecret : auth.jwtSecret;
		const payload = jwt.verify(token, secret);
		const user = await this.getOneById(payload.id);
		if (!user) {
			throw new Unauthenticated("Unauthenticated");
		}
		return user;
	},
	async getLoggedUserIdByToken(bearerToken) {
		const token = extractToken(bearerToken);
		try {
			const payload = jwt.verify(token, auth.jwtSecret);
			return payload.id;
		} catch (e) {
			throw new Unauthenticated("Unauthenticated");
		}
	},
	async getLoggedUserUsernameByToken(bearerToken) {
		const token = extractToken(bearerToken);
		try {
			const payload = jwt.verify(token, auth.jwtSecret);
			return payload.username;
		} catch (e) {
			throw new Unauthenticated("Unauthenticated");
		}
	},
	updateHighScores(user, play) {
		if (play.num_of_meters_reached > user.meters_high_score) {
			user.meters_high_score = play.num_of_meters_reached;
		}
		user.stars_high_score += play.num_of_stars_reached;
		// TODO: WHEN SEASON IS FINISHED RESET VALUE TO ZERO
		// history of league high scores can be accessed from plays table
		user.current_league_stars_score += play.num_of_stars_reached;
		user.honor_points += play.honor_points;
		user.total_time_spent_in_seconds += play.num_of_seconds;
		user.save();
	},
	async checkIfUserCanChangeUsername(user) {
		if (!(!user.username_changed_at || user.paid_for_username_change)) {
			throw new BadActionException("Could not change username", httpCodes.BAD_REQUEST, true, errorMessages.CANT_CHANGE_USERNAME);
		}
	},
	async checkIfUsernameIsTaken(username, id, returnWithBoolean = false) {
		const existingUser = await UserRepository.findByUsernameExceptLoggedUser(username, id);
		if(returnWithBoolean) {
			return !existingUser;
		}
		if (existingUser) {
			throw new BadActionException("Username exists", httpCodes.BAD_REQUEST, true, errorMessages.USERNAME_EXISTS);
		}
	},
	async updateUsername(bearerToken, username) {
		let user = await this.getLoggedUser(bearerToken);
		await this.checkIfUsernameIsTaken(username, user.id);
		await this.checkIfUserCanChangeUsername(user);
		if (username !== user.username) {
			user.username_changed_at = Date.now();
		}
		user.username = username;
		user = await user.save();
		return user;
	},
	async checkIfUserCanChangeCountry(user) {
		const toDate = new Date();
		const fromDate = user.country_changed_at;
		if (fromDate && differenceInMonths(fromDate, toDate) < 6) {
			throw new BadActionException("Change of country", httpCodes.BAD_REQUEST, true, errorMessages.CANT_CHANGE_COUNTRY);
		}
	},
	async changeUserCountry(countryId, bearerToken) {
		let user = await this.getLoggedUser(bearerToken);
		await this.checkIfUserCanChangeCountry(user);
		const country = await CountryService.getOneById(countryId);
		user.country_id = country.id;
		user.country_changed_at = new Date();
		return await user.save();
	},
	async fetchAllUsers(queryData, bearerToken) {
		const {leaderboardType} = queryData;
		const user = await this.getLoggedUser(bearerToken);
		let users = null;
		if (leaderboardType === FRIENDS) {
			users = await FriendshipRepository.findUserFriends(user.id); // TODO : FUNCTION REFACTOR
		} else {
			const options = await GenerateFiltersUtil.generateOptionsForLeaderboards(queryData, user);
			users = await UserRepository.findAllUsers(options);
		}
		return EntityMapper.toDTOList(users, UserDTO);
	},
	async updateUsersLeague(ids, leagueId) {
		await User.update(
			{
				league_id: leagueId
			},
			{
				where: {
					id : {
						[Op.in] : ids
					}
				}
			}
		)
	},
	async updateUsersDivision(ids, divisionId) {
		await User.update(
			{
				division_id: divisionId
			},
			{
				where: {
					id : {
						[Op.in] : ids
					}
				}
			}
		)
	},

}
