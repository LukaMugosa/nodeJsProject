module.exports = (sequelize, DataTypes) => {
	const League = sequelize.define('League', {
		id : {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		min_meters_required: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		current_league_start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		current_league_end_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		next_league_start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		next_league_end_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
	}, {
		tableName: 'leagues'
	});

	League.associate = models => {
		League.hasMany(models.Division, {as : 'divisions', foreignKey: 'league_id'});
		League.hasMany(models.User, {as : 'users', foreignKey: 'user_id'});

		League.addScope('withDivisions', {
			include: {
				model: models.Division,
				as: 'divisions',
				where: {
					active: true
				}
			}
		})
		League.addScope('withAllDivisions', {
			include: {
				model: models.Division,
				as: 'divisions',
			}
		})
	};

	return League;
}