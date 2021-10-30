const {User,Country} = require('../models');
const {generateRandomUsername} = require("../utils/StringUtils");
const bcrypt = require("bcrypt-nodejs");
const salt = bcrypt.genSaltSync(8);
const uuid = require("uuid");
const ProviderType = require("../enum/ProviderType");
const faker = require("faker");
module.exports = {
	async createBotPlayer() {
		await User.create({
			country_id: faker.datatype.number({
				min: 1,
				max: Country.count()
			}),
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
}