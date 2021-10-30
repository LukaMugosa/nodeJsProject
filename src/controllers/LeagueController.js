const {sendResponse} = require('../utils/RequestHandler');
const {sendErrorMessage} = require('../errors/ExceptionTranslator');
const LeagueService = require('../services/LeagueService');
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	async fetchAllLeagues(req, res) {
		try{
			const leagues = await LeagueService.getAllLeaguesWithActiveDivisions();
			sendResponse(res, leagues, httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	}
}