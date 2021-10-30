const {Achievement} = require('../models');
const createLevelsAchievements = async () => {
	const achievements = await Achievement.findAll();
	const levels = [];
	achievements.forEach(achievement => {
		for (let i = 1; i <= achievement.max_levels; i++) {
			levels.push({
				achievement_id: achievement.id,
				level: i,
				max_count: i * (Math.floor((Math.random() * 10) + 1)),
				reward: i * (Math.floor((Math.random() * 20) + 1)),
				createdAt: new Date(),
				updatedAt: new Date()
			})
		}
	});
	return levels;
}

module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('achievement_levels', await createLevelsAchievements(), {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('achievement_levels', null, {})
	}
}