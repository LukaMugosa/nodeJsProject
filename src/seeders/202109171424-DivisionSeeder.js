const generateDivisionsJSON = () => {
	const data = [];
	for (let i = 1; i <= 5; i++) {
		data.push({
			league_id: 2,
			name: `System ${i}`,
			max_num_of_players: 100,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
	}
	return data;
}

module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('divisions', generateDivisionsJSON(), {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Divisions', null, {})
	}
}