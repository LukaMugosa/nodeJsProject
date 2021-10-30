const achievementLevelRepository = require('../repositories/AchievementLevelRepository');
const EntityNotFound = require('../errors/EntityNotFound');
module.exports = {
    async getOneById(id) {
        const level = await achievementLevelRepository.getLevelById(id);
        if(!level) {
            throw new EntityNotFound("AchievementLevel");
        }
        return level;
    }
}