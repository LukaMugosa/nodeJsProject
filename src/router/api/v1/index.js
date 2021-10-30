const router = require('express').Router();

router.use('/auth', require('./auth/auth'));
router.use('/play', require('./play'));
router.use('/profile', require('./profile'));
router.use('/country', require('./country'));
router.use('/league', require('./league'));
router.use('/division', require('./division'));
router.use('/leaderboard', require('./leaderboard'));
router.use('/friendship', require('./friendship'));
router.use('/achievements', require('./achievements'));
router.use('/items', require('./items'));
router.use('/points', require('./points'));
router.use('/skins', require('./skins'));
router.use('/wallpapers', require('./wallpapers'));

module.exports = router;