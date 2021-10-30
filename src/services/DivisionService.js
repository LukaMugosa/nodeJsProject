const DivisionRepository = require('../repositories/DivisionRepository');
const EntityMapper = require('./mapper/EntityMapper');
const DivisionDTO = require('./dtos/DivisionDTO');
const {Division} = require('../models/Division');
const config = require('../config/config');
module.exports = {
	async getAllDivisions() {
		const divisions = await DivisionRepository.findAllDivisions();
		return EntityMapper.toDTOList(divisions, DivisionDTO);
	},
	async createDivision(leagueId, systemNumber) {
		await Division.create({
			league_id: leagueId,
			name: `System ${systemNumber}`,
			max_num_of_players: config.gamePlay.maxPlayersPerDivision
		});
	},

	async setDivisionsToActive(divisions) {
		const inactiveDivisions = this.checkForInactiveDivisions(divisions);
		inactiveDivisions.forEach(division => {
			division.active = true;
			division.save();
		})
	},

	checkForInactiveDivisions(divisions) {
		return divisions.map(division => division.active === false);
	},

	async setLastDivisionsToInactive(divisions, limit) {
		for (let i = limit; i < divisions.length; i++) {
			divisions[i].active = false;
			await divisions[i].save();
		}
	}
}