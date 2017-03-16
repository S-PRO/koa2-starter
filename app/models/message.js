/**
 * Created by andrew on 02.03.17.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('message', {
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        receiver_id: { type: DataTypes.INTEGER, allowNull: false },
        message: { type: DataTypes.STRING(255), allowNull: false },
        delivered: { type: DataTypes.BOOLEAN, allowNull: false,  defaultValue: false},
        is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            },
        },
    });
};
