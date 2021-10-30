module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('leagues', [
		{
			name: 'Unranked',
			min_meters_required: null,
			current_league_start_date: new Date("2021-09-15 00:00:00"),
			current_league_end_date: new Date("2021-10-01 00:00:00"),
			next_league_start_date: new Date("2021-10-01 00:00:00"),
			next_league_end_date: new Date("2021-10-15 00:00:00"),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Galaxy 1',
			min_meters_required: 30,
			current_league_start_date: new Date("2021-09-15 00:00:00"),
			current_league_end_date: new Date("2021-10-01 00:00:00"),
			next_league_start_date: new Date("2021-10-01 00:00:00"),
			next_league_end_date: new Date("2021-10-15 00:00:00"),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('leagues', null, {})
	}
}