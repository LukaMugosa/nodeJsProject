const {Achievement} = require('../models');
const createUserAchievements = async () => {
	const achievements = await Achievement.scope('withLevels').findAll();
	const achUser = [];
	achievements.forEach(achievement => {
		achUser.push({
			user_id: 1,
			achievement_id: achievement.id,
			current_level_id: achievement.levels[0].id,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
	});
	return achUser;
}

module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('achievement_user', await createUserAchievements(), {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('achievement_user', null, {})
	}
}