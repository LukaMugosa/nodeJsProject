const router = require('express').Router();

//controllers
const PointsController = require('../../../../controllers/PointsController');
const AuthMiddleware = require("../../../../middleware/AuthMiddleware");
const StorePointsValidation = require('../../../../validations/StorePointsValidation');

router.use(AuthMiddleware.verifyToken);

router.post(
	'/store',
	StorePointsValidation.validatePointsRequest,
	PointsController.storePoints
)

module.exports = router;
