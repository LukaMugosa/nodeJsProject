module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Skin', {
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
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		is_active : {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		is_promo : {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		tableName: 'skins'
	});
}