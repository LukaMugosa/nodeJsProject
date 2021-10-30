class FriendDTO {
	constructor(user) {
		this.userId = user.id;
		this.username = user.username
	}
}

module.exports = FriendDTO;