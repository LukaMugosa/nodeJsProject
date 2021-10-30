const itemRepository = require('../repositories/ItemRepository');
const entityMapper = require('./mapper/EntityMapper');
const ItemUserDTO = require('./dtos/ItemUserDTO');
const {ItemUser} = require('../models');
const BadActionException = require('../errors/BadActionException');
const EntityNotFound = require('../errors/EntityNotFound');
const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");
const {sequelize} = require('../models');
module.exports = {
    async getAllItemsForUser(userId) {
       const items = await itemRepository.getAllUserItems(userId);
       return entityMapper.toDTOList(items, ItemUserDTO);
    },
    async addInitialItemsToUser(userId) {
        const items = await itemRepository.findAllItems();
        await ItemUser.bulkCreate(this.generateItemUsers(items, userId));
    },

    generateItemUsers(items, userId) {
        const itemUsers = [];
        items.forEach(item => {
            itemUsers.push({
                user_id: userId,
                item_id: item.id
            })
        });
        return itemUsers;
    },

    checkIfUserHasEnoughPoints(honorPoints, price) {
        if(honorPoints < price) {
            throw new BadActionException(
                "Insufficient funds",
                httpCodes.BAD_REQUEST,
                true,
                errorMessages.INSUFFICIENT_FUNDS
            );
        }
    },

    async getOneItemUser(itemUserId, userId) {
        let itemUser = await itemRepository.findItemUserById(itemUserId, userId);
        if(!itemUser) {
            throw new EntityNotFound("ItemUser");
        }
        return itemUser;
    },

    async getOneItemUserByUserAndItem(itemUserId, userId, itemId) {
        let itemUser = await itemRepository.findItemUserByIdAndUserAndItem(itemUserId, userId, itemId);
        if(!itemUser) {
            throw new EntityNotFound("ItemUser");
        }
        return itemUser;
    },

    checkIfSlotLimitReached(maxSlots, numOfAvailableSlots) {
        if(maxSlots === numOfAvailableSlots) {
            throw new BadActionException(
                "Slot limit reached",
                httpCodes.BAD_REQUEST,
                true,
                errorMessages.SLOT_LIMIT_REACHED
            )
        }
    },
    checkIfMinSlotReached(numOfTakenSlots) {
          if(numOfTakenSlots === 0) {
              throw new BadActionException(
                  "Min Slot limit reached",
                  httpCodes.BAD_REQUEST,
                  true,
                  errorMessages.SLOT_LIMIT_REACHED
              )
          }
    },

    async upgradeUserItem(user, data) {
        const {itemUserId, price} = data;
        this.checkIfUserHasEnoughPoints(user.honor_points, price);
        let itemUser = await this.getOneItemUser(itemUserId, user.id);
        this.checkIfSlotLimitReached(itemUser.item.max_slots, itemUser.num_of_available_slots);
        itemUser = await this.commitItemUpgradeTransaction(user, itemUser, price);
        return entityMapper.toDTO(itemUser, ItemUserDTO);
    },

    async commitItemUpgradeTransaction(user, itemUser, price) {
        const transaction = await sequelize.transaction();
        try{
            user.honor_points = user.honor_points - price;
            await user.save();

            itemUser.num_of_available_slots = itemUser.num_of_available_slots + 1;
            await itemUser.save();

            await transaction.commit();
            return itemUser;
        }catch (e) {
            await transaction.rollback();
        }
    },

    async getOneItem(itemId) {
        const item = await itemRepository.findItemById(itemId);
        if(!item){
            throw new EntityNotFound("Item");
        }
        return item;
    },

    async changeItemNumber(user, data) {
        const {itemId, itemUserId, add} = data;
        const itemUser = await this.getOneItemUserByUserAndItem(itemUserId, user.id, itemId);
        if (add) {
            this.checkIfSlotLimitReached(itemUser.num_of_available_slots, itemUser.num_of_taken_slots);
            itemUser.num_of_taken_slots = itemUser.num_of_taken_slots + 1;
        }else{
            this.checkIfMinSlotReached(itemUser.num_of_taken_slots);
            itemUser.num_of_taken_slots = itemUser.num_of_taken_slots - 1;
        }
        await itemUser.save();
        return entityMapper.toDTO(itemUser, ItemUserDTO);
    }

}