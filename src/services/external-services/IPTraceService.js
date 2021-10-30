const axios = require('axios');
const {ipTrace} = require('../../config/config');
const {replaceBaseUrlWithWildcard} = require("../../utils/StringUtils");
const ExternalServiceError = require('../../errors/ExternalServiceError');
module.exports = {
	async traceIpAddress(ipAddress) {
		try{
			if(!ipAddress) {
				return ipTrace.defaultCountryISOCode;
			}
			const url = await replaceBaseUrlWithWildcard(ipTrace.baseUrl, ipTrace.wildcard, ipAddress);
			const response = await axios.get(url);
			if(response.data && response.data.error) {
				return ipTrace.defaultCountryISOCode;
			}
			return response.data.country_code;
		}catch (e) {
			console.log(e);
			throw new ExternalServiceError("IPTrace");
		}
	}
}
