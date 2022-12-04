'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhoneState.init({
    phone: DataTypes.STRING,
    type_state: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhoneState',
  });
  return PhoneState;
};