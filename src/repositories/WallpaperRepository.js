const { sequelize ,Wallpaper, WallpaperUser } = require('../models');
const {GET_USER_WALLPAPERS} = require("../constants/RawQueryConstants");
const {QueryTypes} = require("sequelize");
module.exports = {
	async findAllWallpapers() {
		return await Wallpaper.findAll();
	},
	async findAllUserWallpapers(userId) {
		return await sequelize.query(
			GET_USER_WALLPAPERS.query,
			{
				replacements: {userId: userId},
				type: QueryTypes.SELECT
			}
		)
	},
	async findOneWallpaperUserByUserIdAndWallpaperId(userId, wallpaperId) {
		return await WallpaperUser.scope('withWallpaper')
			.findOne({
				where:{
					user_id: userId,
					wallpaper_id: wallpaperId
				}
			})
	},
	async findWallpaperById(wallpaperId) {
		return await Wallpaper.findByPk(wallpaperId);
	}
}