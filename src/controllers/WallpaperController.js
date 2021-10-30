const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const wallpaperService = require('../services/WallpaperService');
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
const userService = require('../services/UserService');
const {createFileUpload} = require("../utils/FileUtil");
const {PNG, JPEG, JPG} = require("../constants/ImageMimes");
const config = require('../config/config');
module.exports = {
	async getWallpapers(req, res) {
		try {
			const wallpapers = await wallpaperService.getAllWallpapers();
			sendResponse(res, wallpapers, httpCodes.HTTP_OK);
		} catch (e) {
			sendErrorMessage(res, e);
		}
	},
	async getUserWallpapers(req, res) {
		try {
			const userId = await userService.getLoggedUserIdByToken(req.headers['authorization']);
			const wallpapers = await wallpaperService.getAllUserWallpapers(userId);
			sendResponse(res, wallpapers, httpCodes.HTTP_OK);
		} catch (e) {
			sendErrorMessage(res, e);
		}
	},
	async unlockWallpaper(req, res) {
		try {
			const user = await userService.getLoggedUser(req.headers['authorization']);
			const wallpaperUser = await wallpaperService.unlockUserWallpaper(req.body, user);
			sendResponse(res, wallpaperUser, httpCodes.HTTP_CREATED);
		} catch (e) {
			sendErrorMessage(res, e);
		}
	},
	async storeNewWallpaper(req, res) {
		// todo: make thumbnail photo
		const upload = createFileUpload("image", [PNG, JPEG, JPG], null, `public${config.storage.wallpapersStoragePath}`);
		const uploadSingleImage = upload.single("image");
		uploadSingleImage(req, res, async (error) => {
			if (error) {
				res.status(422).json({message: error.message})
			}
			const file = req.file;
			await wallpaperService.createWallpaper(
				req.body,
				`${config.storage.wallpapersStoragePath}/${file.originalname}`,
				`${config.storage.wallpapersStoragePath}/${file.originalname}`)
			return sendResponse(res, {
				file
			}, httpCodes.HTTP_OK);
		})
	},
	async destroy(req, res) {
		try {
			await wallpaperService.deleteWallpaper(req.params.id);
			sendResponse(res, {}, httpCodes.NO_CONTENT)
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}
}
