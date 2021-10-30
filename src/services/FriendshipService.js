const UserService = require('./UserService');
const FriendshipRepository = require('../repositories/FriendshipRepository');
const EntityMapper = require('./mapper/EntityMapper');
const UserDTO = require('./dtos/UserDTO');
const FriendRequestDTO = require('./dtos/FriendRequestDTO');
const {Friendship} = require('../models');
const BadActionException = require('../errors/BadActionException');
const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");
const {PENDING, ACCEPTED, DECLINED} = require("../enum/FriendshipStatus");
const EntityNotFound = require('../errors/EntityNotFound');
module.exports = {

	async extractUsersFromFriendship(friendships, userId) {
		if(friendships.length > 0) {
			return friendships.map(friendship => {
				if (friendship.requester_id === userId) {
					return friendship.addressee;
				} else {
					return friendship.requester;
				}
			});
		}
		return [];
	},

	async getLoggedUserFriends(bearerToken) {
		const userId = await UserService.getLoggedUserIdByToken(bearerToken);
		const friendships = await FriendshipRepository.findMyFriends(userId);
		const friends = await this.extractUsersFromFriendship(friendships, userId);
		return EntityMapper.toDTOList(friends, UserDTO);
	},

	async getLoggedUserFriendRequests(bearerToken) {
		const userId = await UserService.getLoggedUserIdByToken(bearerToken);
		const friendRequests = await FriendshipRepository.findFriendRequests(userId);
		return EntityMapper.toDTOList(friendRequests, FriendRequestDTO);
	},

	async checkIfFriendshipExists(requester_id, addressee_id) {
		const friendshipExists = await FriendshipRepository
			.findFriendshipByRequesterAndAddressee(requester_id, addressee_id);
		if(friendshipExists) {
			throw new BadActionException("Friendship", httpCodes.BAD_REQUEST, true, errorMessages.FRIENDSHIP_EXISTS);
		}
	},

	async checkIfIdIsLoggedUserId(loggedUserId, addresseeUserId) {
		if(loggedUserId === addresseeUserId) {
			throw new BadActionException("Friendship", httpCodes.BAD_REQUEST, true, errorMessages.FRIENDSHIP_WITH_SELF);
		}
	},

	async sendFriendshipRequestToUser(data, bearerToken) {
		const {userId} = data;
		const loggedUserId = await UserService.getLoggedUserIdByToken(bearerToken);
		const addresseeUser = await UserService.getOneById(userId);
		await this.checkIfFriendshipExists(loggedUserId, addresseeUser.id);
		await this.checkIfIdIsLoggedUserId(loggedUserId, addresseeUser.id);
		// TODO: SEND NOTIFICATIONS
		const friendship = await Friendship.create({
			requester_id: loggedUserId,
			addressee_id: addresseeUser.id,
			friendship_status: PENDING
		});
		return EntityMapper.toDTO(friendship, FriendRequestDTO);
	},

	async resolveFriendRequest(data, bearerToken) {
		const {friendRequestId, accept} = data;
		const loggedUserId = await UserService.getLoggedUserIdByToken(bearerToken);
		let friendRequest = await FriendshipRepository.findByIdAndIsPendingAndAddresseeId(friendRequestId, loggedUserId);
		if(!friendRequest) {
			throw new EntityNotFound("FriendRequest");
		}
		// TODO: SEND NOTIFICATIONS
		friendRequest.friendship_status = accept ? ACCEPTED : DECLINED;
		friendRequest = await friendRequest.save();
		return friendRequest;
	},

}