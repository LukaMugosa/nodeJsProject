const {ADMIN, PLAYER} = require("../constants/RoleConstants");

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('roles', [
			{
				name : ADMIN.name,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name : PLAYER.name,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		],{});

	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('roles', null, {});
	}
}