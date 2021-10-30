const {Country} = require('../models');
const {Op} = require("sequelize");
module.exports = {
	async findByIsoCode(isoCode) {
		return await Country.findOne({
			where: {
				[Op.or] : {iso_code: isoCode, iso_code_3: isoCode}
			}
		})
	},
	async findById(id) {
		return await Country.findByPk(id);
	},
	async findAllCountries() {
		return await Country.findAll();
	}

}