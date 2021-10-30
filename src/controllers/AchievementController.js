const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const userService = require('../services/UserService');
const achievementService = require('../services/AchievementService');
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
module.exports = {

	async fetchAllAchievements(req, res) {
		try {
			const achievements = await achievementService.getAllAchievements();
			sendResponse(res, achievements, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async fetchAchievement(req, res) {
		try {
			const achievement = await achievementService.getOneAchievement(req.params.id);
			sendResponse(res, achievement, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async fetchAllUserAchievements(req, res) {
		try{
			const userId = await userService.getLoggedUserIdByToken(req.headers['authorization']);
			const userAchievements = await achievementService.getUserAchievements(userId);
			sendResponse(res, userAchievements, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async storeUserAchievement(req, res) {
		try {
			const userId = await userService.getLoggedUserIdByToken(req.headers['authorization']);
			const achievementUser = await achievementService.saveAchievementToUser(userId, req.body);
			sendResponse(res, achievementUser, httpCodes.HTTP_CREATED);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async claimAchievement(req, res) {
		try{
			const{achievementId, currentLevelId} = req.body;
			const user = await userService.getLoggedUser(req.headers['authorization']);
			const reward = await achievementService
				.claimUserAchievementUserAndGetReward(achievementId, user, currentLevelId);
			const data = {
				status: "success",
				reward: reward,
			}
			sendResponse(res, data, httpCodes.HTTP_CREATED);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}

}