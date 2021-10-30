module.exports = (sequelize, DataTypes) => {
	const AchievementUser = sequelize.define('AchievementUser', {
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			achievement_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			current_level_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			previous_level_id: {
				type: DataTypes.BIGINT,
				allowNull: true
			},
			is_claimed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			current_count: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
		},
		{
			tableName: 'achievement_user'
		})

	AchievementUser.associate = models => {
		AchievementUser.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'user',
		});
		AchievementUser.belongsTo(models.Achievement, {
			foreignKey: 'achievement_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'achievement',
		});
		AchievementUser.belongsTo(models.AchievementLevel, {
			foreignKey: 'current_level_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'currentLevel',
		});
		AchievementUser.belongsTo(models.AchievementLevel, {
			foreignKey: 'previous_level_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'previousLevel',
		});
	}

	return AchievementUser;
}