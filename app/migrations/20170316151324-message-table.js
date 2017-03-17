'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('messages', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            owner_id: { type: Sequelize.INTEGER, allowNull: false },
            receiver_id: { type: Sequelize.INTEGER, allowNull: false },
            message: { type: Sequelize.STRING(255), allowNull: false },
            delivered: { type: Sequelize.BOOLEAN, allowNull: false,  defaultValue: false},
            is_read: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: function (queryInterface, Sequelize) {
      /*
       Add reverting commands here.
       Return a promise to correctly handle asynchronicity.

       Example:
       return queryInterface.dropTable('users');
       */
    }
};
