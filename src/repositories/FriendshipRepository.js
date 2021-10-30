const {sequelize, Friendship} = require('../models');
const {Op, QueryTypes} = require("sequelize");
const {PENDING, DECLINED} = require("../enum/FriendshipStatus");
const {GET_USER_FRIENDS_ORDERED_BY_METERS} = require("../constants/RawQueryConstants");
module.exports = {

	async findByIdAndIsPendingAndAddresseeId(id, addresseeId) {
		return await Friendship.findOne({
			where: {
				[Op.and] : [
					{
						id: id
					},
					{
						friendship_status : PENDING
					},
					{
						addressee_id: addresseeId
					}
				]
			}
		});
	},

	async findMyFriends(loggedUserId) {
		return await Friendship.scope({method: ['myFriends', loggedUserId]})
			.findAll();
	},

	async findUserFriends(userId) {
		return await sequelize.query(
			GET_USER_FRIENDS_ORDERED_BY_METERS.query,
			{
				replacements: {userId: userId},
				type: QueryTypes.SELECT,
				nest: true,
			}
		)
	},

	async findFriendRequests(loggedUserId) {
		return await Friendship.scope('friendRequests')
			.findAll({
				where: {
					addressee_id: {
						[Op.eq]: loggedUserId
					}
				}
			})
	},

	async findFriendshipByRequesterAndAddressee(requester_id, addressee_id) {
		return await Friendship.findOne({
			where: {
				[Op.and] : [
					{
						[Op.or]: [
							{
								[Op.and] :
									{
										requester_id: requester_id,
										addressee_id: addressee_id
									}
							},
							{
								[Op.and]:
									{
										requester_id: addressee_id,
										addressee_id: requester_id
									}
							},
						]
					},
					{
						friendship_status : {
							[Op.ne] : DECLINED
						}
					}
				],

			}
		});
	}

}