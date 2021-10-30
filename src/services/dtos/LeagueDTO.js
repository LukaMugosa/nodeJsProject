const EntityMapper = require('../mapper/EntityMapper');
const DivisionDTO = require('./DivisionDTO');

const setDivisions = (league) => {
	return league.divisions.length > 0 ? EntityMapper.toDTOList(league.divisions, DivisionDTO) : [];
}

class LeagueDTO {
	constructor(league) {
		this.id = league.id;
		this.name = league.name;
		this.divisions = setDivisions(league);
	}
}

module.exports = LeagueDTO;