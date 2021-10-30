module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        achievement_code: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            index: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        max_levels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        google_play_string: {
            type: DataTypes.STRING,
            allowNull: true
        },
        game_center_string: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },{
        tableName: 'achievements'
    });

    Achievement.associate = models => {
        Achievement.hasMany(models.AchievementLevel, {
            foreignKey: 'achievement_id',
            onDelete: 'restrict',
            onUpdate: 'restrict',
            as: 'levels'
        })

        Achievement.addScope('withLevels', {
            include: [
                {
                    model : models.AchievementLevel,
                    as: 'levels',
                    attributes: ['id', 'achievement_id', 'level', 'max_count', 'reward']
                }
            ]
        })
    }

    return Achievement;
}