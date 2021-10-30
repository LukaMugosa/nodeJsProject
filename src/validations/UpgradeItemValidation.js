const ExceptionTranslator = require('../errors/ExceptionTranslator');
const Joi = require("joi");
const RequestHandler = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	validateUpgradeItemReq(req, res, next) {
		const schema = Joi.object({
			itemUserId: Joi.number().min(1).required(),
			price: Joi.number().min(0).required(),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}