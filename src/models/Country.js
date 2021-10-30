module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Country', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		iso_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		iso_code_3: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		phone_code: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	}, {
		tableName: 'countries'
	});
}