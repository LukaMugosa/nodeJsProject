const { ItemUser, Item } = require('../models');
module.exports = {

    async getAllUserItems(userId) {
        return await ItemUser.scope('withItemData').findAll({
            where : {
                user_id: userId
            }
        })
    },
    async findAllItems() {
        return await Item.findAll();
    },
    async findItemUserById(id, userId) {
        return await ItemUser.scope('withItemData').findOne({
            where: {
                id: id,
                user_id: userId
            }
        });
    },
    async findItemUserByIdAndUserAndItem(id, userId, itemId) {
        return await ItemUser.scope('withItemData').findOne({
            where: {
                id: id,
                user_id: userId,
                item_id: itemId
            }
        });
    },
    async findItemById(id) {
        return await ItemUser.scope('withItemData').findByPk(id);
    }
}