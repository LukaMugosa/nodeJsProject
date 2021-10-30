const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
const FriendshipService = require('../services/FriendshipService');
module.exports = {
	async getMyFriends(req, res) {
		try{
			const friends = await FriendshipService.getLoggedUserFriends(req.headers['authorization']);
			sendResponse(res, friends, httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async getMyFriendRequests(req, res) {
		try {
			const friendRequests = await FriendshipService.getLoggedUserFriendRequests(req.headers['authorization']);
			sendResponse(res, friendRequests, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async sendFriendRequest(req, res) {
		try{
			const friendship = await FriendshipService.sendFriendshipRequestToUser(req.body, req.headers['authorization']);
			sendResponse(res, friendship, httpCodes.HTTP_CREATED);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async acceptOrDecline(req, res) {
		try {
			const friendRequest = await FriendshipService.resolveFriendRequest(req.body, req.headers['authorization']);
			sendResponse(res, friendRequest, httpCodes.HTTP_CREATED);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},
}