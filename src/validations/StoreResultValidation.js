const ExceptionTranslator = require('../errors/ExceptionTranslator');
const Joi = require("joi");
const RequestHandler = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");

module.exports = {
	validateStoreResult(req, res, next) {
		const schema = Joi.object({
			numOfStarsReached: Joi.number().min(0).required(),
			numOfMetersReached: Joi.number().min(0).required(),
			numOfSeconds: Joi.number().min(0).required(),
			honorPoints: Joi.number().min(0).required(),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}