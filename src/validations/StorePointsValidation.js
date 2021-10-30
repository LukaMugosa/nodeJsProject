const ExceptionTranslator = require('../errors/ExceptionTranslator');
const Joi = require("joi");
const RequestHandler = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	validatePointsRequest(req, res, next) {
		const schema = Joi.object({
			stars: Joi.number().min(0).required().allow(null),
			honorPoints: Joi.number().min(0).required().allow(null),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}