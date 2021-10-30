const {COUNTRY, LEAGUE} = require("../constants/LeaderboardTypeConstants");
const {Op} = require("sequelize");
const {STARS} = require("../constants/RankingConstants");
module.exports = {
	async generateOptionsForLeaderboards(queryData, user) {
		const {rankingBy, leaderboardType, limit} = queryData;
		let options = { where: {}, order: [], limit: parseInt(limit) || 200};
		if(rankingBy && rankingBy === STARS){
			options.order.push(["current_league_stars_score", "DESC"])
		}else{
			options.order.push(["meters_high_score", "DESC"])
		}

		if(leaderboardType && leaderboardType === COUNTRY){
			options.where.country_id = {[Op.eq] : user.country_id};
		}

		if(leaderboardType && leaderboardType === LEAGUE) {
			options.where.league_id = {[Op.eq] : user.league_id};
			options.where.division_id = {[Op.eq] : user.division_id};
		}

		return options;
	},
}