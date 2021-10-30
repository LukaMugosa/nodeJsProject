const CountryRepository = require('../repositories/CountryRepository');
const EntityNotFound = require('../errors/EntityNotFound');
const EntityMapper = require('../services/mapper/EntityMapper');
const CountryDTO = require('../services/dtos/CountryDTO');
module.exports = {
	async getOneByIsoCode(isoCode) {
		const country = await CountryRepository.findByIsoCode(isoCode);
		if(!country){
			throw new EntityNotFound("Country");
		}
		return country;
	},
	async fetchAllCountries() {
		let countries = await CountryRepository.findAllCountries();
		return EntityMapper.toDTOList(countries, CountryDTO);
	},
	async getOneById(countryId) {
		const country = await CountryRepository.findById(countryId);
		if(!country) {
			throw new EntityNotFound("Country");
		}
		return country;
	}
}