const {PENDING, ACCEPTED, DECLINED} = require("../enum/FriendshipStatus");
const {Op} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const Friendship = sequelize.define('Friendship', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		requester_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		addressee_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		friendship_status: {
			type: DataTypes.ENUM({
				values: [
					PENDING, ACCEPTED, DECLINED
				]
			})
		}
	}, {
		tableName: 'friendships'
	});

	const attributes = ['id', 'requester_id', 'addressee_id', 'friendship_status'];

	Friendship.associate = models => {
		Friendship.belongsTo(models.User, {
			foreignKey: 'requester_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'requester'
		});
		Friendship.belongsTo(models.User, {
			foreignKey: 'addressee_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			as: 'addressee'
		});

		Friendship.addScope('friendRequests', {
			where: {
				friendship_status: {[Op.eq] : PENDING}
			},
			include: [
				{
					model: models.User,
					foreignKey: 'requester_id',
					as: 'requester',
					attributes: ['id', 'username']
				}
			],
			attributes: attributes
		});
		Friendship.addScope('myFriends', (userId) => ({
			where: {
				[Op.and] : [
					{
						friendship_status: {[Op.eq] : ACCEPTED}
					},
					{
						[Op.or] : [
							{requester_id: userId},
							{addressee_id: userId}
						]
					}
				]
			},
			include: [
				{
					model: models.User,
					foreignKey: 'requester_id',
					as: 'requester',
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
						}
					],
					attributes: [
						'id',
						'username',
						'meters_high_score',
						'stars_high_score',
						'current_league_stars_score',
						'last_login',
						'honor_points',
						'total_time_spent_in_seconds',
					]
				},
				{
					model: models.User,
					foreignKey: 'addressee_id',
					as: 'addressee',
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
						}
					],
					attributes: ['id', 'username', 'meters_high_score']
				},
			],
			attributes: attributes
		}));

	}

	return Friendship;
}