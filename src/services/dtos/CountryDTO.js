class CountryDTO {
	constructor(country) {
		this.id = country.id;
		this.name = country.name;
		this.isoCode = country.iso_code;
	}
}

module.exports = CountryDTO;