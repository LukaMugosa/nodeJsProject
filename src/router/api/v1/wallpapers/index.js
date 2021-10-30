const router = require('express').Router();

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const WallpaperController = require('../../../../controllers/WallpaperController');
const UnlockWallpaperValidation = require('../../../../validations/UnlockWallpaperValidation');

router.use(AuthMiddleware.verifyToken);

router.get('/', WallpaperController.getWallpapers);
router.get('/user', WallpaperController.getUserWallpapers);
router.post('/unlock', UnlockWallpaperValidation.validateWallpaperRequest, WallpaperController.unlockWallpaper);

module.exports = router;