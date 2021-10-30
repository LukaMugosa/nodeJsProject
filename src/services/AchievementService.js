const {Achievement, AchievementUser} = require('../models');
const achievementRepository = require('../repositories/AchievementRepository');
const achievementLevelService = require('../services/AchievementLevelService');
const entityMapper = require('./mapper/EntityMapper');
const AchievementDTO = require('./dtos/AchievementDTO');
const AchievementUserDTO = require('./dtos/AchievementUserDTO');
const BadActionException = require('../errors/BadActionException');
const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");
const EntityNotFound = require('../errors/EntityNotFound');
module.exports = {
    async getAllAchievements() {
        const achievements = await achievementRepository.findAllAchievements();
        return entityMapper.toDTOList(achievements, AchievementDTO);
    },
    async getUserAchievements(userId) {
        const userAchievements = await achievementRepository.findAllAchievementsByUserId(userId);
        return entityMapper.toDTOList(userAchievements, AchievementUserDTO);
    },
    async claimUserAchievementUserAndGetReward(achievementId, user, currentLevelId) {
        let userAchievement = await achievementRepository
            .findNotClaimedAchievementByUser(achievementId, user.id, currentLevelId);
        const achievementLevel = await achievementLevelService.getOneById(currentLevelId);
        if (!userAchievement || (userAchievement.current_count < achievementLevel.max_count)) {
            throw new BadActionException(
                "Achievement cannot be claimed",
                httpCodes.BAD_REQUEST,
                true,
                errorMessages.ACHIEVEMENT_CANNOT_BE_CLAIMED
            );
        }
        userAchievement.is_claimed = true;
        userAchievement = await userAchievement.save();
        user.honor_points += achievementLevel.reward;
        await user.save();
        return achievementLevel.reward;
    },
    async createAchievementsForUser(user) {
        const achievements = await Achievement.scope('withLevels').findAll();
        await AchievementUser.bulkCreate(this.createAchievementArray(user.id, achievements));
    },

    createAchievementArray(userId, achievements) {
		const achievementUser = [];
	    for (let i = 0; i < achievements.length; i++) {
		    achievementUser.push({
			    user_id: userId,
			    achievement_id: achievements[i].id,
			    current_level_id: achievements[i].levels[0].id
		    });
	    }
		return achievementUser;
    },

    checkIfLevelsAreValid(currentLevel, previousLevel, achievementId) {
        return (currentLevel.achievement_id !== achievementId || previousLevel.achievement_id !== achievementId) || (previousLevel.level > currentLevel.level);
    },

    async checkSentLevels(achievementId, currentLevelId, previousLevelId) {
        const achievement = await achievementRepository.findOneById(achievementId);
        const currentLevel = await achievementLevelService.getOneById(currentLevelId);
        if(previousLevelId) {
            const previousLevel = await achievementLevelService.getOneById(previousLevelId);
            if (this.checkIfLevelsAreValid(currentLevel, previousLevel, achievement.id)) {
                throw new BadActionException(
                    "Invalid levels sent",
                    httpCodes.BAD_REQUEST,
                    true,
                    errorMessages.INVALID_LEVELS_SENT
                )
            }
        }else{
            if (currentLevel.achievement_id !== achievement.id) {
                throw new BadActionException(
                    "Invalid levels sent",
                    httpCodes.BAD_REQUEST,
                    true,
                    errorMessages.INVALID_LEVELS_SENT
                )
            }
        }
    },

    async saveAchievementToUser(userId, data) {

        const {achievementId, currentLevelId, previousLevelId, currentCount} = data;

        await this.checkSentLevels(achievementId, currentLevelId, previousLevelId);

        let achievementUser = await achievementRepository
            .findByAchievementAndUserAndLevels(achievementId, userId, currentLevelId, previousLevelId);

        if (achievementUser) {
            achievementUser.current_count += currentCount;
            achievementUser = await achievementUser.save();
        } else {
            achievementUser = await AchievementUser.create({
                user_id: userId,
                achievement_id: achievementId,
                current_level_id: currentLevelId,
                previous_level_id: previousLevelId,
                current_count: currentCount
            });
        }
        return achievementUser;
    },
    async getOneAchievement(id) {
        const achievement = await achievementRepository.findOneById(id);
        if (!achievement) {
            throw new EntityNotFound("Achievement")
        }
        return new AchievementDTO(achievement);
    }

}