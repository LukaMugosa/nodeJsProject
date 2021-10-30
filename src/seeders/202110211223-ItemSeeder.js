const ItemType = require('../enum/ItemType');
module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('items', [
			{
				item_name : ItemType.FIRE_BARRAGE,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.LASER,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.MAGNET,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.MATRIX,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.NONE,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.STAR,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.ROCKET,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.SCORE,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				item_name : ItemType.SHIELD,
				max_slots : 7,
				price : 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],{});

	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('items', null, {});
	}
}