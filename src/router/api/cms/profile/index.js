const router = require('express').Router();
const ProfileController = require('../../../../controllers/ProfileController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const AdminMiddleware = require('../../../../middleware/AdminMiddleware');

router.use(AuthMiddleware.verifyToken);
router.use(AdminMiddleware.isAdmin);

router.get(
	'/me',
	ProfileController.me
);

module.exports = router;