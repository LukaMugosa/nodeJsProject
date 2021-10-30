module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Wallpaper', {
		id : {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		image_path: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image_thumbnail_path: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		tableName: 'wallpapers'
	});
}