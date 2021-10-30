const CountryService = require('../services/CountryService');
const CountryDTO = require('../services/dtos/CountryDTO');
const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
module.exports = {
	async getAllCountries(req, res) {
		const countries = await CountryService.fetchAllCountries();
		RequestHandler.sendResponse(res, countries, httpCodes.HTTP_OK)
	}
}