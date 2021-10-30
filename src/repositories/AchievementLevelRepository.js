const {AchievementLevel} = require('../models');
module.exports = {
    async getLevelById(id) {
        return await AchievementLevel.findByPk(id);
    }
}