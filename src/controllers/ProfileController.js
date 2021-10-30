const UserService = require('../services/UserService');
const {sendResponse} = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require('../errors/ExceptionTranslator');
const UserDTO = require('../services/dtos/UserDTO');

module.exports = {
	async changeUserName(req, res) {
		try{
			const {username} = req.body;
			const user = await UserService.updateUsername(req.headers['authorization'], username);
			sendResponse(res, new UserDTO(user), httpCodes.HTTP_CREATED);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async checkUsernameAvailability(req, res) {
		try {
			const {username} = req.body;
			const bearerToken = req.headers['authorization'];
			const existingUser = await UserService.checkIfUsernameIsTaken(
				username,
				await UserService.getLoggedUserIdByToken(bearerToken),
				true
			);
			sendResponse(res, {available: existingUser}, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async changeCountry(req, res) {
		try {
			const {countryId} = req.body;
			const user = await UserService.changeUserCountry(countryId, req.headers['authorization']);
			sendResponse(res, new UserDTO(user), httpCodes.HTTP_CREATED)
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},
	async me(req, res) {
		try {
			const user = await UserService.getLoggedUser(req.headers['authorization']);
			sendResponse(res, new UserDTO(user), httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},
	async getUserProfile(req, res) {
		try {
			const user = await UserService.getOneById(req.params.id);
			sendResponse(res, new UserDTO(user), httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},
}