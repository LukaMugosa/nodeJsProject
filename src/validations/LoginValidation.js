const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require('../errors/ExceptionErrors')
const Joi = require('joi');
const ProviderType = require('../enum/ProviderType');
const ExceptionTranslator = require('../errors/ExceptionTranslator');

module.exports = {
	validateLoginRequest(req, res, next) {
		const schema = Joi.object({
			email: Joi.string().email().allow(null, ""),
			providerId: Joi.string().required(),
			// isoCode: Joi.string().max(3).allow(null, ""),
			providerType: Joi.string().required().valid(
				ProviderType.DEFAULT,
				ProviderType.GOOGLE,
				ProviderType.FACEBOOK,
				ProviderType.APPLE
			)
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}