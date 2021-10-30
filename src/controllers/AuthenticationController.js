const JWTUtil = require('../utils/JWTUtil');
const UserDTO = require('../services/dtos/UserDTO');
const UserService = require('../services/UserService');
const RequestHandler = require('../utils/RequestHandler');
const {errorMessages, httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const SecurityService = require("../services/security/SecurityService");
const {sendResponse} = require("../utils/RequestHandler");
const Unauthenticated = require('../errors/Unauthenticated');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
	async login(req, res) {
		try {
			let user = await UserService.getOneByProviderIdOrEmail(req);
			let firstTimeLogin = false;
			if (!user) {
				user = await UserService.createUser(req.body, req.headers['x-forwarded-for']);
				firstTimeLogin = true;
			}
			await UserService.setLastLogin(user);
			const userDTO = new UserDTO(user);
			const responseData = {
				access_token: JWTUtil.jwtSignUser({id: userDTO.id, username: userDTO.username}),
				refresh_token: JWTUtil.jwtSignUser({id: userDTO.id, username: userDTO.username}, true),
				user: userDTO,
				firstTimeLogin: firstTimeLogin
			};
			RequestHandler.sendResponse(res, responseData, httpCodes.HTTP_OK);
		} catch (err) {
			console.log(err);
			RequestHandler.sendResponse(res, errorMessages.SERVER_ERROR, httpCodes.SERVER_ERROR);
		}
	},

	async refreshToken(req, res) {
		const {refreshToken} = req.body;
		try {
			const user = await SecurityService.getAuthenticatedUser(res, "Bearer " + refreshToken, true);
			const data = {
				access_token: JWTUtil.jwtSignUser({id: user.id, username: user.username}),
				refresh_token: JWTUtil.jwtSignUser({id: user.id, username: user.username}, true),
			};
			sendResponse(res, data, httpCodes.HTTP_OK);
		} catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async loginCMS(req, res) {
		try{
			const {username, password} = req.body;
			const user = await UserService.handleAdminLogin(username, password);
			const userDTO = new UserDTO(user);
			const response = {
				access_token: JWTUtil.jwtSignUser({id: userDTO.id, username: userDTO.username}),
				refresh_token: JWTUtil.jwtSignUser({id: userDTO.id, username: userDTO.username}, true),
				user: userDTO,
			}
			sendResponse(res, response, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}
}