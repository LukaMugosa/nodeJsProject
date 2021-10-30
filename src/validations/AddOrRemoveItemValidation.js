const ExceptionTranslator = require('../errors/ExceptionTranslator');
const Joi = require("joi");
const RequestHandler = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	addItemValidation(req, res, next) {
		const schema = Joi.object({
			itemUserId: Joi.number().min(1).required(),
			itemId: Joi.number().min(1).required(),
			add: Joi.boolean().required(),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}