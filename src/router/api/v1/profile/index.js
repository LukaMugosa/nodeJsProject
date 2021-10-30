const router = require('express').Router();
const ProfileController = require('../../../../controllers/ProfileController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const ChangeUsernameValidation = require('../../../../validations/ChangeUsernameValidation');
const ChangeCountryValidation = require('../../../../validations/ChangeCountryValidation');
router.use(AuthMiddleware.verifyToken);

router.post(
	'/change-username',
	ChangeUsernameValidation.validateUsername,
	ProfileController.changeUserName
);
router.post(
	'/change-country',
	ChangeCountryValidation.validateCountry,
	ProfileController.changeCountry
);
router.get(
	'/me',
	ProfileController.me
);
router.post(
	'/check-username-availability',
	ChangeUsernameValidation.validateUsername,
	ProfileController.checkUsernameAvailability
);
router.get(
	'/user/:id',
	ProfileController.getUserProfile
);

module.exports = router;