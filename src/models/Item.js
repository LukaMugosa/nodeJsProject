const ItemType = require('../enum/ItemType');
module.exports = (sequelize, DataTypes) => {

	return sequelize.define('Item', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		item_name: {
			type: DataTypes.ENUM({
				values: [
					ItemType.FIRE_BARRAGE,
					ItemType.LASER,
					ItemType.NONE,
					ItemType.STAR,
					ItemType.MAGNET,
					ItemType.MATRIX,
					ItemType.ROCKET,
					ItemType.SCORE,
					ItemType.SHIELD,
				]
			})
		},
		has_slot_upgrade: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		has_duration_upgrade: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		max_slots: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		duration_in_ms: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: 30000
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: 'items'
	});
}