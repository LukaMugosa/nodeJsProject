const router = require('express').Router();
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const FriendshipController = require('../../../../controllers/FriendshipController');
const SendFriendRequestValidation = require('../../../../validations/SendFriendRequestValidation');
router.use(AuthMiddleware.verifyToken);

router.get(
	'/my-friends',
	FriendshipController.getMyFriends
)

router.get(
	'/friend-requests',
	FriendshipController.getMyFriendRequests
)

router.post(
	'/send-request',
	SendFriendRequestValidation.validateFriendRequest,
	FriendshipController.sendFriendRequest
)

router.post(
	'/resolve-request',
	FriendshipController.acceptOrDecline
)

module.exports = router;