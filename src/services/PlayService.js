const {Play} = require("../models");
const UserService = require('./UserService');
const LeagueService = require('./LeagueService');
const {GALAXY_1, UNRANKED} = require("../constants/LeagueConstants");
module.exports = {

	async setUserLeague(user, numOfMetersReached) {
		const league = await LeagueService.getOneLeague(GALAXY_1.id);
		if(numOfMetersReached >= league.min_meters_required){
			user.league_id = league.id;
			await user.save();
		}
		return user;
	},

	async storeUserResult(data, bearerToken) {
		const {numOfMetersReached, numOfStarsReached, numOfSeconds, honorPoints} = data;
		let user = await UserService.getLoggedUser(bearerToken);
		if(user.league.id === UNRANKED.id){
			user = await this.setUserLeague(user, numOfMetersReached);
		}
		const play = await Play.create({
			user_id: user.id,
			league_id: user.league_id,
			num_of_stars_reached: numOfStarsReached,
			num_of_meters_reached: numOfMetersReached,
			num_of_seconds: numOfSeconds,
			honor_points: honorPoints,
		});
		UserService.updateHighScores(user, play);


		return play;

	}
}