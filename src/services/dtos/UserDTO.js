class UserDTO {
	constructor(user) {
		this.id = user.id;
		this.providerId = user.provider_id;
		this.skinId = user.skin_id ;
		this.username = user.username;
		this.leagueId = user.league ? user.league.id : null;
		this.leagueName = user.league ? user.league.name : null;
		this.divisionId = user.division ? user.division.id : null;
		this.divisionName = user.division ? user.division.name : null;
		this.countryId = user.country ? user.country.id : null;
		this.countryName = user.country ? user.country.name : null;
		this.countryIsoCode = user.country ? user.country.iso_code : null;
		this.metersHighScore = user.meters_high_score;
		this.starsHighScore = user.stars_high_score;
		this.currentLeagueStarsScore = user.current_league_stars_score;
		this.honorPoints = user.honor_points;
		this.lastLogin = user.last_login;
		this.timeSpentInSeconds = user.total_time_spent_in_seconds;
	}
}

module.exports = UserDTO;