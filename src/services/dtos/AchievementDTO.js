const entityMapper = require('../mapper/EntityMapper');
const AchievementLevelDTO = require('./AchievementLevelDTO');
class AchievementDTO {
	constructor(achievement) {
		this.id = achievement.id;
		this.achievementCode = achievement.achievement_code;
		this.title = achievement.title;
		this.description = achievement.description;
		this.maxLevels = achievement.max_levels;
		this.googlePlayString = achievement.google_play_string;
		this.gameCenterString = achievement.game_center_string;
		this.isHidden = achievement.is_hidden;
		this.levels = entityMapper.toDTOList(achievement.levels, AchievementLevelDTO);
	}
}

module.exports = AchievementDTO;