const LeagueRepository = require('../repositories/LeagueRepository');
const UserRepository = require('../repositories/UserRepository');
const EntityMapper = require('./mapper/EntityMapper');
const LeagueDTO = require('../services/dtos/LeagueDTO');
const EntityNotFound = require('../errors/EntityNotFound');
const config = require('../config/config');
const divisionService = require('../services/DivisionService');
const botService = require('../services/BotService');
const {LEAGUE} = require("../constants/LeaderboardTypeConstants");
const {UNRANKED, GALAXY_1} = require("../constants/LeagueConstants");
const userRepository = require('../repositories/UserRepository');
const userService = require('./UserService');
module.exports = {
	async getAllLeaguesWithActiveDivisions() {
		let leagues = await LeagueRepository.allLeaguesWithActiveDivisions();
		return EntityMapper.toDTOList(leagues, LeagueDTO);
	},
	async getOneLeague(id) {
		const league = await LeagueRepository.findOneById(id);
		if (!league) {
			throw new EntityNotFound("League");
		}
		return league;
	},
	// TODO: NEEDS TO BE TRANSACTIONAL
	async shufflePlayersToLeagues() {
		const leagues = await LeagueRepository.allLeagues();
		if (new Date() === new Date(leagues[0].next_league_start_date)) {
			try {
				const totalNumOfPlayers = UserRepository.countAllUsers();
				const maxNumOfPlayersPerDivision = config.gamePlay.maxPlayersPerDivision;
				const calcResult = await this.calculateDivisionsAndPlayersNumber(totalNumOfPlayers, maxNumOfPlayersPerDivision);
				let numOfDivInLeague = null;
				let diffInDivisions = null;
				// noinspection ES6MissingAwait
				leagues.forEach(async (league) => {
					await this.setDivisionNumberForCurrentSeason(league, numOfDivInLeague, calcResult.numOfDivisionsPerLeague, diffInDivisions);
				});
				let users = null;
				let ids = null;
				// noinspection ES6MissingAwait
				leagues.forEach(async (league) => {
					if (league.id === UNRANKED) {
						users = await userRepository.getUsersFromLeagueOne();
						ids = users.map(user => user.id);
						await userService.updateUsersLeague(ids, GALAXY_1.id);
						// TODO: UPDATE USERS DIVISION LOGIC
					} else {
					// TODO: UPDATE OTHER LEAGUES BY 1/4 PERCENTAGE
					}
				});

				// TODO: PLAYER SHUFFLE
			} catch (e) {

			}
		}
	},

	async calculateDivisionsAndPlayersNumber(totalNumOfPlayers, maxNumOfPlayersPerDivision) {
		let remainder = totalNumOfPlayers % maxNumOfPlayersPerDivision;
		const maxNumOfPlayersPerDivisionDefault = maxNumOfPlayersPerDivision;
		while (remainder !== 0) {
			--maxNumOfPlayersPerDivision;
			remainder = totalNumOfPlayers % maxNumOfPlayersPerDivision;
			if (totalNumOfPlayers <= (maxNumOfPlayersPerDivisionDefault / 2)) {
				maxNumOfPlayersPerDivision = maxNumOfPlayersPerDivisionDefault;
				await botService.createBotPlayer();
				++totalNumOfPlayers;
				remainder = totalNumOfPlayers % maxNumOfPlayersPerDivision;
			}
		}
		return {
			numOfDivisionsPerLeague: totalNumOfPlayers / maxNumOfPlayersPerDivision,
			playersPerDivision: maxNumOfPlayersPerDivision
		};
	},

	async setDivisionNumberForCurrentSeason(league, numOfDivInLeague, numOfDivisionPerLeague, diffInDivisions) {
		numOfDivInLeague = league.divisions.length;
		if (numOfDivInLeague < numOfDivisionPerLeague) {
			diffInDivisions = Math.abs(numOfDivisionPerLeague - numOfDivInLeague);
			await divisionService.setDivisionsToActive(league.divisions);
			for (let i = 1; i < diffInDivisions; i++) {
				await divisionService.createDivision(league.id, numOfDivInLeague + i);
			}
		} else {
			await divisionService.setLastDivisionsToInactive(league.divisions, numOfDivisionPerLeague);
		}
	}

}