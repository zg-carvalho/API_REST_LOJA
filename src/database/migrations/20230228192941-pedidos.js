'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      itens: {
        type: Sequelize.STRING,
        allowNull: false,
      },


      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('pedidos');

  }
};
