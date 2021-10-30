const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const ProviderType = require('../enum/ProviderType');
const {BO} = require("../constants/SkinConstants");
const {PLAYER} = require("../constants/RoleConstants");
function hashPassword (user) {
	const SALT_FACTOR = 8

	if (!user.changed('password')) {
		return;
	}

	return bcrypt
		.genSaltAsync(SALT_FACTOR)
		.then(salt => bcrypt.hashAsync(user.password, salt, null))
		.then(hash => {
			user.setDataValue('password', hash)
		})
}

const userAttributes = ['id','role_id','country_id', 'league_id', 'division_id', 'username', 'meters_high_score', 'stars_high_score', 'honor_points', 'total_time_spent_in_seconds', 'last_login', 'password'];


module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		role_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: PLAYER.id
		},
		country_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		league_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		division_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		skin_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: BO.id
		},
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
		provider_id: {
			type: DataTypes.STRING,
			unique: true
		},
		provider_type: {
			type: DataTypes.ENUM({
				values: [
					ProviderType.DEFAULT,
					ProviderType.GOOGLE,
					ProviderType.APPLE,
					ProviderType.FACEBOOK
				]
			})
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true
		},
		meters_high_score: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		stars_high_score: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		current_league_stars_score: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		honor_points: {
			type: DataTypes.DOUBLE,
			defaultValue: 0
		},
		total_time_spent_in_seconds: {
			type: DataTypes.DOUBLE,
			defaultValue: 0
		},
		accepts_promotions: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		last_login: {
			type: DataTypes.DATE,
			defaultValue: new Date()
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		username_changed_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		country_changed_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		paid_for_username_change : {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		tableName: 'users',
		scopes: {
			activeUsers: {
				where: {
					is_active: true
				},
				attributes: userAttributes
			}
		},
		defaultScope:{
			where: {
				is_active: true
			},
			attributes: {userAttributes},
		},
		hooks: {
			beforeCreate: hashPassword,
			beforeUpdate: hashPassword
		}
	})

	User.prototype.comparePassword = function (password) {
		return bcrypt.compareAsync(password, this.password);
	}

	User.associate = models => {
		User.belongsTo(models.Country, {
			foreignKey: 'country_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'country',
		})
		User.belongsTo(models.League, {
			foreignKey: 'league_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'league',
		})
		User.belongsTo(models.Division, {
			foreignKey: 'division_id',
			onDelete: 'restrict',
			onUpdate: 'restrict',
			as: 'division',
		})
		User.hasMany(models.Friendship, {
			foreignKey: 'requester_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'requesters',
		});
		User.hasMany(models.Friendship, {
			foreignKey: 'addressee_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'addressees',
		});
		User.hasOne(models.Skin, {
			foreignKey: 'skin_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'skin',
		});

		User.addScope('additionalData', {
			include: [
				{
					model : models.League,
					as: 'league',
					attributes: ['id', 'name']
				},
				{
					model : models.Division,
					as: 'division',
					attributes: ['id', 'name']
				},
				{
					model : models.Country,
					as: 'country',
					attributes: ['id', 'iso_code', 'name']
				},
				{
					model : models.Skin,
					as: 'skin',
					attributes: ['id', 'name', 'price', 'is_promo']
				},
			]
		});

	}


	return User
}