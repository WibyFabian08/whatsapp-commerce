'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partner_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'active', 'expire', 'timeout')
      },
      expire_date: {
        type: Sequelize.DATE
      },
      apikey: {
        type: Sequelize.STRING
      },
      notif_alert: {
        type: Sequelize.STRING
      },
      session: {
        type: Sequelize.TEXT
      },
      qrcode: {
        type: Sequelize.TEXT
      },
      paid_status: {
        type: Sequelize.ENUM('pending', 'paid', 'expired', 'blocked')
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};