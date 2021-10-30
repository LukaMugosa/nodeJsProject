const router = require('express').Router();
const CountryController = require('../../../../controllers/CountryController');
router.get(
	'/get-all-countries',
	CountryController.getAllCountries
)

module.exports = router;