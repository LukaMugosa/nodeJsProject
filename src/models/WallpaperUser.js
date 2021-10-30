module.exports = (sequelize, DataTypes) => {
	const WallpaperUser = sequelize.define('WallpaperUser', {
		id : {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		wallpaper_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		has_been_unlocked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		tableName: 'wallpaper_user'
	});

	WallpaperUser.associate = models => {
		WallpaperUser.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'user'
		});
		WallpaperUser.belongsTo(models.Wallpaper, {
			foreignKey: 'wallpaper_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'wallpaper'
		});

		WallpaperUser.addScope('withWallpaper', {
			include: [
				{
					model : models.Wallpaper,
					as: 'wallpaper',
				}
			]
		})
	}

	return WallpaperUser;

}
//270 * 480