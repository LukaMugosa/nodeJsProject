const Joi = require('joi');
const ExceptionTranslator = require('../errors/ExceptionTranslator');
const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
module.exports = {
	validateCountry(req, res, next) {
		const schema = Joi.object({
			countryId: Joi.number().required()
		});
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}