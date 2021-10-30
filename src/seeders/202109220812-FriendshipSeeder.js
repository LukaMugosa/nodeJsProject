const {ACCEPTED} = require("../enum/FriendshipStatus");
module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('friendships', [
		{
			requester_id: 1,
			addressee_id: 2,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 1,
			addressee_id: 3,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 3,
			addressee_id: 2,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 3,
			addressee_id: 4,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 1,
			addressee_id: 4,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 1,
			addressee_id: 5,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 1,
			addressee_id: 6,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 2,
			addressee_id: 4,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 4,
			addressee_id: 6,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 5,
			addressee_id: 4,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 2,
			addressee_id: 5,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			requester_id: 2,
			addressee_id: 6,
			friendship_status: ACCEPTED,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('friendships', null, {})
	}
}