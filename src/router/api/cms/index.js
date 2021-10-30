const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/wallpapers', require('./wallpapers'));
router.use('/profile', require('./profile'));

module.exports = router;