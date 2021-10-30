const router = require('express').Router();

//controllers
const PlayController = require('../../../../controllers/PlayController');

//middlewares
const AuthMiddleware = require("../../../../middleware/AuthMiddleware");

const StoreResultValidation = require('../../../../validations/StoreResultValidation');

router.use(AuthMiddleware.verifyToken);

router.post(
	'/store-result',
	StoreResultValidation.validateStoreResult,
	PlayController.storeResult
)

module.exports = router;
