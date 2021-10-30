const router = require('express').Router();

const AuthenticationController = require('../../../../controllers/AuthenticationController');
const TestController = require('../../../../controllers/TestController');

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const LoginValidation = require('../../../../validations/LoginValidation');

router.post(
	'/login',
	LoginValidation.validateLoginRequest,
	AuthenticationController.login
)
router.post(
	'/refresh-token',
	// LoginValidation.validateLoginRequest,
	AuthenticationController.refreshToken
)
router.get(
	'/test',
	AuthMiddleware.verifyToken,
	TestController.test
)

module.exports = router;