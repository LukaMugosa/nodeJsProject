const router = require('express').Router();

router.use('/v1', require('./v1'));
router.use('/cms', require('./cms'));

module.exports = router;