module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('skins', [
		{
			name: "Bo'",
			price: 0,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Pyjama Boy",
			price: 0,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Pyjama Girl",
			price: 0,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Crnogorac",
			price: 0,
			is_promo: true,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: "Divernaut",
			price: 50,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Crocodile",
			price: 80,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Pandanaut",
			price: 100,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: "Unicorn",
			price: 100,
			is_promo: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('skins', null, {});
	}
}