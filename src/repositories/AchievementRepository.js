const {sequelize, Achievement, AchievementUser} = require('../models');
const {GET_ACHIEVEMENTS_BY_USER} = require("../constants/RawQueryConstants");
const {QueryTypes, Op} = require("sequelize");
module.exports = {
	async findAllAchievements() {
		return await Achievement.scope('withLevels').findAll()
	},
	async findOneById(id) {
		return await Achievement.scope('withLevels').findByPk(id);
	},
	async findAllAchievementsByUserId(userId) {
		return await sequelize.query(
			GET_ACHIEVEMENTS_BY_USER.query,
			{
				replacements: {userId: userId},
				type: QueryTypes.SELECT,
			}
		)
	},
	async findNotClaimedAchievementByUser(achievementId, userId, currentLevelId) {
		return await AchievementUser.findOne({
			where: {
				[Op.and] : [
					{
						achievement_id: achievementId
					},
					{
						user_id: userId
					},
					{
						current_level_id: currentLevelId
					},
					{
						is_claimed: false
					}
				]
			}
		})
	},
	async findByAchievementAndUserAndLevels(achievementId, userId, currentLevelId, previousLevelId) {
		return await AchievementUser.findOne({
			where : {
				[Op.and] : [
					{
						achievement_id: achievementId
					},
					{
						user_id: userId
					},
					{
						current_level_id: currentLevelId
					},
					{
						previous_level_id: previousLevelId
					},
				]
			}
		})
	}
}