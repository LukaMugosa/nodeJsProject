const { WallpaperUser, Wallpaper, sequelize} = require('../models');
const wallpaperRepository = require('../repositories/WallpaperRepository');
const userRepository = require('../repositories/UserRepository');
const entityMapper = require('./mapper/EntityMapper');

const WallpaperDTO = require('./dtos/WallpaperDTO');
const EntityNotFound = require('../errors/EntityNotFound');
const BadActionException = require("../errors/BadActionException");

const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");

module.exports = {
	async createUserWallpapers(userId) {
		await WallpaperUser.bulkCreate(await this.generateWallpaperArray(userId));
	},
	async generateWallpaperArray(userId){
		const userWallpapers = [];
		const wallpapers = await wallpaperRepository.findAllWallpapers();
		wallpapers.forEach(wallpaper => {
			userWallpapers.push({
				user_id: userId,
				wallpaper_id: wallpaper.id,
			})
		});
		return userWallpapers;
	},
	async getAllWallpapers() {
		const wallpapers = await wallpaperRepository.findAllWallpapers();
		return entityMapper.toDTOList(wallpapers, WallpaperDTO);
	},
	async getAllUserWallpapers(userId) {
		const wallpapers = await wallpaperRepository.findAllUserWallpapers(userId);
		return entityMapper.toDTOList(wallpapers, WallpaperDTO);
	},
	async getOneWallpaperUser(wallpaperId, userId) {
		const wallpaperUser = await wallpaperRepository
			.findOneWallpaperUserByUserIdAndWallpaperId(userId,wallpaperId);
		if(!wallpaperUser) {
			throw new EntityNotFound("WallpaperUser");
		}
		return wallpaperUser;
	},

	checkForUnlockedSkin(wallpaperUser) {
		if(wallpaperUser.has_been_unlocked) {
			throw new BadActionException(
				"Already Unlocked",
				httpCodes.BAD_REQUEST,
				true,
				errorMessages.ALREADY_UNLOCKED
			);
		}
	},
	checkForSufficenFunds(wallpaperUser, user) {
		if(wallpaperUser.wallpaper.price > user.honor_points) {
			throw new BadActionException(
				"Insufficient funds",
				httpCodes.BAD_REQUEST,
				true,
				errorMessages.INSUFFICIENT_FUNDS
			);
		}
	},

	async unlockUserWallpaper(data, user) {
		const {wallpaperId} = data;
		const wallpaperUser = await this.getOneWallpaperUser(wallpaperId, user.id);
		this.checkForUnlockedSkin(wallpaperUser);
		this.checkForSufficenFunds(wallpaperUser, user);
		const transaction = await sequelize.transaction();
		try{
			user.honor_points = user.honor_points - wallpaperUser.wallpaper.price;
			await user.save();

			wallpaperUser.has_been_unlocked = true;
			await wallpaperUser.save();

			await transaction.commit();
			return wallpaperUser;
		}catch (e) {
			await transaction.rollback();
		}
	},

	async createWallpaper(data, imagePath,imageThumbnailPath) {
		const {price} = data;
		const wallpaper = await Wallpaper.create({
			price: price,
			image_path: imagePath,
			image_thumbnail_path: imageThumbnailPath,
		});
		this.generateNewUserWallpaper(wallpaper.id);
	},

	async generateNewUserWallpaper(wallpaperId) {
		const users = await userRepository.getAllUsers();
		const userIds = users.map(user => user.id);
		const wallpaperUsers = []
		userIds.forEach(id => {
			wallpaperUsers.push({
				user_id: id,
				wallpaper_id: wallpaperId
			});
		});
		await WallpaperUser.bulkCreate(wallpaperUsers);
	},

	async deleteWallpaper(wallpaperId) {
		const wallpaper = await wallpaperRepository.findWallpaperById(wallpaperId);
		if(!wallpaper) {
			throw new EntityNotFound("Wallpaper");
		}
		return await wallpaper.destroy();
	}

}
