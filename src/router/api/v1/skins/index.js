const router = require('express').Router();

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const SkinController = require('../../../../controllers/SkinController');
const UnlockSkinValidation = require('../../../../validations/UnlockSkinValidation');

router.use(AuthMiddleware.verifyToken);


router.get('/', SkinController.fetchAllSkins);

router.post(
	'/unlock',
	UnlockSkinValidation.validateSkinRequest,
	SkinController.unlockSelectedSkin
);

router.post(
	'/set-skin',
	UnlockSkinValidation.validateSkinRequest,
	SkinController.setSkin
);


module.exports = router;