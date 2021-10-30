class FriendRequestDTO {
	constructor(friendship) {
		this.friendRequestId = friendship.id;
		this.requesterId = friendship.requester_id;
		this.addresseeId = friendship.addressee_id;
		this.friendshipStatus = friendship.friendship_status;
	}
}

module.exports = FriendRequestDTO;