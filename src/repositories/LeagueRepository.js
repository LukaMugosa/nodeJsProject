const {League} = require('../models');
module.exports = {
	async allLeaguesWithActiveDivisions(){
		return await League.scope('withDivisions').findAll();
	},
	async allLeagues(){
		return await League.scope('withAllDivisions').findAll();
	},
	async findOneById(id) {
		return await League.findByPk(id);
	}
}