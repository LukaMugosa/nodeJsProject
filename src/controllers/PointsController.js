const userService = require('../services/UserService');
const pointService = require('../services/PointService');
const UserDTO = require('../services/dtos/UserDTO');
const entityMapper = require('../services/mapper/EntityMapper');
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
module.exports = {
	async storePoints(req, res) {
		try{
			let user = await userService.getLoggedUser(req.headers['authorization']);
			user = await pointService.addPointsToUser(user, req.body);
			sendResponse(res,  entityMapper.toDTO(user, UserDTO), httpCodes.HTTP_CREATED);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}
}