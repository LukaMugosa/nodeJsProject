const router = require('express').Router();

const AuthenticationController = require('../../../../controllers/AuthenticationController')
const CMSLoginValidation = require('../../../../validations/CMSLoginValidation');

router.post('/login', CMSLoginValidation.validateCmsLoginRequest, AuthenticationController.loginCMS);
router.post(
	'/refresh-token',
	AuthenticationController.refreshToken
)
module.exports = router;