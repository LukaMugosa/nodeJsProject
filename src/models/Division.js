module.exports = (sequelize, DataTypes) => {
	const Division = sequelize.define('Division', {
		id : {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		league_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		max_num_of_players: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		active : {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	}, {
		tableName: 'divisions'
	});

	Division.associate = (models) => {
		Division.belongsTo(models.League, {
			foreignKey: 'league_id',
			onDelete: 'restrict',
			onUpdate: 'restrict'
		});
	};

	return Division;
}