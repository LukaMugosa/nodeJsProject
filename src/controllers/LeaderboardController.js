const UserService = require('../services/UserService');
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	async getLeaderboardData(req, res) {
		try {
			const users = await UserService.fetchAllUsers(req.query, req.headers['authorization']);
			sendResponse(res, users, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}
}