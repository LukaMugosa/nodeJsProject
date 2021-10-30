module.exports = (sequelize, DataTypes) => {
	const SkinUser =  sequelize.define('SkinUser', {
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
		skin_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		has_been_unlocked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		tableName: 'skin_user'
	});

	SkinUser.associate = models => {
		SkinUser.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'user'
		});
		SkinUser.belongsTo(models.Skin, {
			foreignKey: 'skin_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'skin'
		});

		SkinUser.addScope('withSkin', {
			include: [
				{
					model : models.Skin,
					as: 'skin',
				}
			]
		})
	}

	return SkinUser;
}