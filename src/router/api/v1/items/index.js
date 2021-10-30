const router = require('express').Router();
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const ItemController = require('../../../../controllers/ItemController');

const UpgradeItemValidation = require('../../../../validations/UpgradeItemValidation');
const AddOrRemoveItemValidation = require('../../../../validations/AddOrRemoveItemValidation');

router.use(AuthMiddleware.verifyToken);

router.get('/', ItemController.fetchUserItems);
router.post('/upgrade-item', UpgradeItemValidation.validateUpgradeItemReq ,ItemController.upgradeItem);
router.post('/change-item-number', AddOrRemoveItemValidation.addItemValidation, ItemController.changeNumberOfItems);

module.exports = router;