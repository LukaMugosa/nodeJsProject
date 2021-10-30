const router = require('express').Router();
const DivisionController = require('../../../../controllers/DivisionController');

router.get(
    '/all',
    DivisionController.fetchAllDivisions
);

module.exports = router;