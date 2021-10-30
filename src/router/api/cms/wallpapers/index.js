const router = require('express').Router();

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const AdminMiddleware = require('../../../../middleware/AdminMiddleware');
const WallpaperController = require('../../../../controllers/WallpaperController');

router.use(AuthMiddleware.verifyToken);
router.use(AdminMiddleware.isAdmin);

router.get('/', WallpaperController.getWallpapers);
router.post('/store', WallpaperController.storeNewWallpaper);
router.delete('/:id', WallpaperController.destroy);

module.exports = router;
