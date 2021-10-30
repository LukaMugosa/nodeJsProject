const skinRepository = require('../repositories/SkinRepository');
const SkinDTO = require('./dtos/SkinDTO');
const entityMapper = require('./mapper/EntityMapper');
const {Skin, SkinUser, sequelize} = require('../models');
const {BO, PB, PG, MNE, DIVERNAUT, CROCODILE, PANDANAUT, UNICORN} = require("../constants/SkinConstants");
const EntityNotFound = require('../errors/EntityNotFound');
const BadActionException = require("../errors/BadActionException");
const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");
const UserDTO = require('./dtos/UserDTO');
module.exports = {

	async getAllSkins(userId) {
		const skins = await skinRepository.findAllActiveSkins(userId);
		return entityMapper.toDTOList(skins, SkinDTO);
	},

	async getOneUserSkin(userId, skinId) {
		const skinUser = await skinRepository.findSkinByUserIdAndSkinId(userId, skinId);
		if(!skinUser) {
			throw new EntityNotFound("SkinUser");
		}
		return skinUser;
	},

	checkForUnlockedSkin(skinUser) {
		if(skinUser.has_been_unlocked) {
			throw new BadActionException(
				"Already Unlocked",
				httpCodes.BAD_REQUEST,
				true,
				errorMessages.ALREADY_UNLOCKED
			);
		}
	},

	checkForSufficenFunds(skinUser, user) {
		if(skinUser.skin.price > user.honor_points) {
			throw new BadActionException(
				"Insufficient funds",
				httpCodes.BAD_REQUEST,
				true,
				errorMessages.INSUFFICIENT_FUNDS
			);
		}
	},

	async unlockSkin(data, user) {
		const {skinId} = data;
		const skinUser = await this.getOneUserSkin(user.id, skinId);
		this.checkForUnlockedSkin(skinUser);
		this.checkForSufficenFunds(skinUser, user);
		const transaction = await sequelize.transaction();
		try{
			user.honor_points = user.honor_points - skinUser.skin.price;
			await user.save();

			skinUser.has_been_unlocked = true;
			await skinUser.save();

			await transaction.commit();
			return skinUser;
		}catch (e) {
			await transaction.rollback();
		}
	},

	async setDefaultSkin(data, user) {
		const {skinId} = data;
		const skinUser = await this.getOneUserSkin(user.id, skinId);
		if(!skinUser.has_been_unlocked) {
			throw new BadActionException(
				"Skin is not unlocked",
				httpCodes.BAD_REQUEST,
				true,
				errorMessages.IS_NOT_UNLOCKED
			);
		}
		user.skin_id = skinId;
		return new UserDTO(await user.save());
	},

	createUserSkinArray(userId) {
		return [
			{
				user_id: userId,
				skin_id: BO.id,
				has_been_unlocked: true
			},
			{
				user_id: userId,
				skin_id: PB.id,
				has_been_unlocked: true
			},
			{
				user_id: userId,
				skin_id: PG.id,
				has_been_unlocked: true
			},
			{
				user_id: userId,
				skin_id: MNE.id,
				has_been_unlocked: false
			},
			{
				user_id: userId,
				skin_id: DIVERNAUT.id,
				has_been_unlocked: false
			},
			{
				user_id: userId,
				skin_id: CROCODILE.id,
				has_been_unlocked: false
			},
			{
				user_id: userId,
				skin_id: PANDANAUT.id,
				has_been_unlocked: false
			},
			{
				user_id: userId,
				skin_id: UNICORN.id,
				has_been_unlocked: false
			},
		];
	},

	createInitialUserSkins(userId) {
		try {
			const userSkins = SkinUser.bulkCreate(this.createUserSkinArray(userId));
		}catch (e) {
			throw new Error("An error occurred while trying to save user skins.");
		}
	}
}