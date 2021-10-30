const {Skin, sequelize, SkinUser} = require('../models');
const {GET_USER_SKINS} = require("../constants/RawQueryConstants");
const {QueryTypes} = require("sequelize");
const {sk} = require("faker/lib/locales");
module.exports = {
	async findAllActiveSkins(userId) {
		return await sequelize.query(
			GET_USER_SKINS.query,
			{
				replacements: {userId: userId},
				type: QueryTypes.SELECT
			}
		)
	},
	async findSkinByUserIdAndSkinId(userId, skinId) {
		return await SkinUser.scope('withSkin').findOne({
			where: {
				skin_id: skinId,
				user_id: userId
			}
		})
	}
}