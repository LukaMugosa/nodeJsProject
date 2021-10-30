const ExceptionTranslator = require('../errors/ExceptionTranslator');
const Joi = require("joi");
const RequestHandler = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	validateFriendRequest(req, res, next) {
		const schema = Joi.object({
			userId: Joi.number().required(),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}