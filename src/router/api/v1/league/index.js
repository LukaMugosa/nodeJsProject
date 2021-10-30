const router = require('express').Router();
const LeagueController = require('../../../../controllers/LeagueController');

router.get(
	'/all',
	LeagueController.fetchAllLeagues,
);

module.exports = router;