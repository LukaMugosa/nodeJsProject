module.exports = (sequelize, DataTypes) => {
	const Play = sequelize.define('Play', {
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
		league_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		num_of_meters_reached: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		num_of_stars_reached: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		honor_points: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		num_of_seconds: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
	}, {
		tableName: 'plays'
	});

	Play.associate = models => {
		Play.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'restrict',
			onUpdate: 'restrict'
		})
		Play.belongsTo(models.League, {
			foreignKey: 'league_id',
			onDelete: 'restrict',
			onUpdate: 'restrict'
		})
	}

	return Play;
}