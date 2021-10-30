const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const itemService = require('../services/ItemService');
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
const userService = require("../services/UserService");
module.exports = {
	async fetchUserItems(req, res) {
		try{
			const userId = await userService.getLoggedUserIdByToken(req.headers['authorization']);
			const items = await itemService.getAllItemsForUser(userId);
			sendResponse(res, items, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e)
		}
	},
	async upgradeItem(req, res) {
		try{
			const user = await userService.getLoggedUser(req.headers['authorization']);
			const itemUser = await itemService.upgradeUserItem(user, req.body);
			sendResponse(res, itemUser, httpCodes.HTTP_CREATED)
		}catch (e) {
			sendErrorMessage(res, e)
		}
	},
	async changeNumberOfItems(req, res) {
		try {
			const user = await userService.getLoggedUser(req.headers['authorization']);
			const itemUser = await itemService.changeItemNumber(user, req.body);
			sendResponse(res, itemUser, httpCodes.HTTP_CREATED)
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}
}