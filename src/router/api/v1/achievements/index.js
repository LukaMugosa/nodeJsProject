const router = require('express').Router();
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const AchievementController = require('../../../../controllers/AchievementController');
const claimAchievementValidation = require('../../../../validations/ClaimAchievementValidation');
const storeAchievementValidation = require('../../../../validations/StoreAchievementValidation');
router.use(AuthMiddleware.verifyToken);

router.get(
	'/all',
	AchievementController.fetchAllAchievements
);
router.get(
	'/',
	AchievementController.fetchAllUserAchievements
);
router.get(
	'/:id',
	AchievementController.fetchAchievement
);

router.post(
	'/claim-reward',
	claimAchievementValidation.validateAchievementClaim,
	AchievementController.claimAchievement
);

router.post(
	'/store-achievement',
	storeAchievementValidation.validateAchievementStorage,
	AchievementController.storeUserAchievement
);


module.exports = router;