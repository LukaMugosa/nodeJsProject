const router = require('express').Router();
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const LeaderboardController = require('../../../../controllers/LeaderboardController');

router.use(AuthMiddleware.verifyToken);

router.get(
	'/',
	LeaderboardController.getLeaderboardData
)

module.exports = router;