const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require('../errors/ExceptionErrors')
const Joi = require('joi');
const ProviderType = require('../enum/ProviderType');
const ExceptionTranslator = require('../errors/ExceptionTranslator');

module.exports = {
	validateCmsLoginRequest(req, res, next) {
		const schema = Joi.object({
			username: Joi.string().max(60).required(),
			password: Joi.string().min(6).max(40).required(),
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}