const {sequelize, User} = require("../models");
const {Op, QueryTypes} = require("sequelize");
const {GET_USERS_FOR_LEAGUE_ONE} = require("../constants/RawQueryConstants");
const {GALAXY_1, UNRANKED} = require("../constants/LeagueConstants");
const {ADMIN} = require("../constants/RoleConstants");

module.exports = {
	async findById(id) {
		return await User.scope('additionalData').findByPk(id);
	},
	async findByProviderId(providerId) {
		return await User.scope('additionalData').findOne({
			where: {
				provider_id: providerId
			}
		});
	},
	async findByEmail(email) {
		return await User.scope('additionalData').findOne({
			where: {
				email: email
			}
		});
	},
	async findByUsername(username) {
		return await User.scope('additionalData').findOne({
			where: {
				username: username
			},
		});
	},
	async findAdminByUsername(username) {
		return await User.scope('additionalData').findOne({
			where: {
				username: username,
				role_id: ADMIN.id
			},
		});
	},
	async findByUsernameExceptLoggedUser(username, userId) {
		return await User.findOne({
			where: {
				username: username,
				id: {
					[Op.ne] : userId
				}
			},
		});
	},
	async findAllUsers(options) {
		return await User.scope('additionalData').findAll(options);
	},
	async getAllUsers() {
		return await User.findAll();
	},
	async countUsersByOptions(options) {
		return await User.count(options);
	},
	async countAllUsers() {
		return await User.count();
	},
	async getUsersFromLeagueOne() {
		return await sequelize.query(
			GET_USERS_FOR_LEAGUE_ONE.query,
			{
				replacements: {leagueId : UNRANKED.id},
				type: QueryTypes.SELECT
			}
		)
	}
}