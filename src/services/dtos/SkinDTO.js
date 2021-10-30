class SkinDTO {
	constructor(skin) {
		this.skinId = skin.id;
		this.name = skin.name;
		this.price = skin.price;
		this.isPromo = skin.is_promo;
		this.hasBeenUnlocked = skin.has_been_unlocked === 1;
	}
}

module.exports = SkinDTO;