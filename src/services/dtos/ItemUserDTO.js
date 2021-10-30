class ItemUserDTO {

    constructor(itemUser) {
        this.itemId = itemUser.item.id;
        this.itemName = itemUser.item.item_name;
        this.itemUserId = itemUser.id;
        this.hasSlotUpgrade = itemUser.item.has_slot_upgrade;
        this.hasDurationUpgrade = itemUser.item.has_duration_upgrade;
        this.maxSlots = itemUser.item.max_slots;
        this.duration = itemUser.item.duration_in_ms;
        this.price = itemUser.item.price;
        this.numOfTakenSlots = itemUser.num_of_taken_slots;
        this.numOfAvailableSlots = itemUser.num_of_available_slots;
    }


}
module.exports = ItemUserDTO;