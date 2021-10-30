const password = '12345678';
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(8);
const uuid = require('uuid');
const ProviderType = require('../enum/ProviderType');
const {ADMIN} = require("../constants/RoleConstants");
module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('users', [
		{
			country_id: 242,
			league_id: 1,
			role_id: ADMIN.id,
			username: '4dmeen.St4rbLIND',
			password: bcrypt.hashSync(password, salt),
			provider_id: uuid.v4(),
			provider_type: ProviderType.GOOGLE,
			createdAt: new Date(),
			updatedAt: new Date(),
			meters_high_score: 0,
			stars_high_score: 0,
			current_league_stars_score: 0,
		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('users', null, {});
	}
}