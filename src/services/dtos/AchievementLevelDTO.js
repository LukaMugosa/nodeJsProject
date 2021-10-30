class AchievementLevelDTO {
	constructor(achievementLevel) {
		this.id = achievementLevel.id;
		this.achievementId = achievementLevel.achievement_id;
		this.level = achievementLevel.level;
		this.maxCount = achievementLevel.max_count;
		this.reward = achievementLevel.reward;
	}
}

module.exports = AchievementLevelDTO;