const leagueService = require('../services/LeagueService');
/**
 * A cron job for shuffling
 * leagues and divisions
 * at the right time
 * @type {{dispatch()}}
 */
module.exports = {
	async dispatch() {
		console.log("RUNNING A SCHEDULED JOB FOR REARRANGING LEAGUES AND DIVISIONS");

		await leagueService.shufflePlayersToLeagues();

		console.log("SCHEDULED JOB FOR REARRANGING LEAGUES AND DIVISIONS ENDED");
	}
}