const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(8);
const uuid = require('uuid');
const ProviderType = require('../enum/ProviderType');
const config = require('../config/config');
const faker = require('faker');
const {generateRandomUsername} = require("../utils/StringUtils");
const {User, Play, Country} = require('../models');
const {Op} = require("sequelize");
const achievementService = require('../services/AchievementService');
const generateBots = () => {
	const bots = [];
	for (let i = 0; i < config.gamePlay.numberOfBots; i++) {
		bots.push({
			country_id: 242,
			league_id: 1,
			username: "Bot_" + generateRandomUsername(),
			password: bcrypt.hashSync(uuid.v4(), salt),
			provider_id: uuid.v4(),
			provider_type: ProviderType.GOOGLE,
			createdAt: new Date(),
			updatedAt: new Date(),
			meters_high_score: faker.datatype.number({
				'min': 50,
				'max': 150
			}),
			stars_high_score: faker.datatype.number({
				'min': 50,
				'max': 150
			}),
			current_league_stars_score: faker.datatype.number({
				'min': 50,
				'max': 150
			}),
		})
	}
	return bots;
}

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('users', generateBots(), {});
		const botUsers = await User.findAll({
			where: {
				username: {
					[Op.like] : "Bot%"
				}
			}
		});
		botUsers.forEach(bot => {
			Play.create({
				user_id: bot.id,
				league_id: 1,
				num_of_meters_reached: faker.datatype.number({
					'min': 50,
					'max': 150
				}),
				num_of_stars_reached: faker.datatype.number({
					'min': 50,
					'max': 150
				})
			})
			achievementService.createAchievementsForUser(bot);
		});

	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('users', null, {});
	}
}