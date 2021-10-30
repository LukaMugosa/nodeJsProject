module.exports = (sequelize, DataTypes) => {
    const ItemUser = sequelize.define('ItemUser', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        item_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        num_of_available_slots: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2
        },
        num_of_taken_slots: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    },
    {
        tableName: 'item_user'
    })

    ItemUser.associate = models => {
        ItemUser.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'restrict',
            onUpdate: 'restrict',
            as: 'user'
        });
        ItemUser.belongsTo(models.Item, {
            foreignKey: 'item_id',
            onDelete: 'restrict',
            onUpdate: 'restrict',
            as: 'item'
        });

        ItemUser.addScope('withItemData', {
            include: [
                {
                    model: models.Item,
                    as: 'item',
                }
            ]
        })

    }
    return ItemUser;
}