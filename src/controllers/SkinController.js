const skinService = require('../services/SkinService');
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const userService = require('../services/UserService');
module.exports = {
	async fetchAllSkins(req, res) {
		try {
			const userId = await userService.getLoggedUserIdByToken(req.headers['authorization']);
			const skins = await skinService.getAllSkins(userId);
			sendResponse(res, skins, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},
	async unlockSelectedSkin(req, res) {
		try {
			const user = await userService.getLoggedUser(req.headers['authorization']);
			const skinUser = await skinService.unlockSkin(req.body, user);
			sendResponse(res, skinUser, httpCodes.HTTP_CREATED);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},
	async setSkin(req, res) {
		try {
			let user = await userService.getLoggedUser(req.headers['authorization']);
			user = await skinService.setDefaultSkin(req.body, user);
			sendResponse(res, user, httpCodes.HTTP_CREATED);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	}
}