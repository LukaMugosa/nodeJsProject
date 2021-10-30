class AchievementUserDTO {
	constructor(achievementUser) {
		this.id = achievementUser.id;
		this.achievementCode = achievementUser.achievement_code;
		this.title = achievementUser.title;
		this.description = achievementUser.description;
		this.reward = achievementUser.reward;
		this.currentLevelId = achievementUser.current_level_id;
		this.previousLevelId = achievementUser.previous_level_id;
		this.currentLevel = achievementUser.level;
		this.isClaimed = achievementUser.is_claimed;
		this.maxLevels = achievementUser.max_levels;
		this.maxCount = achievementUser.max_count;
		this.currentCount = achievementUser.current_count;
		this.googlePlayString = achievementUser.google_play_string;
		this.gameCenterString = achievementUser.game_center_string;
		this.isHidden = achievementUser.is_hidden;
		this.isDone = achievementUser.is_done;
	}
}

module.exports = AchievementUserDTO;