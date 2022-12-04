'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init({
    partner_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'active', 'expire', 'timeout'),
    expire_date: DataTypes.DATE,
    apikey: DataTypes.STRING,
    notif_alert: DataTypes.STRING,
    session: DataTypes.TEXT,
    qrcode: DataTypes.TEXT,
    paid_status: DataTypes.ENUM('pending', 'paid', 'expired', 'blocked')
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};