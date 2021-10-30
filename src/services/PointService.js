module.exports = {
	async addPointsToUser(user, data) {
		const {honorPoints, stars} = data;
		if(honorPoints){
			user.honor_points = user.honor_points + honorPoints;
		}
		if(stars) {
			user.stars_high_score = user.stars_high_score + stars;
			user.current_league_stars_score = user.current_league_stars_score + stars;
		}
		return await user.save();
	}
}