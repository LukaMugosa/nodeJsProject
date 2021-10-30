
module.exports = (sequelize, DataTypes) => {
    const AchievementLevel = sequelize.define('AchievementLevel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        achievement_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reward: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'achievement_levels'
    })

    AchievementLevel.associate = models => {
        AchievementLevel.belongsTo(models.Achievement, {
            foreignKey: 'achievement_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'achievement',
        });
    }

    return AchievementLevel;
}