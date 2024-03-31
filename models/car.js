'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    name: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      defaultValue: "small"
    },
    price: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      defaultValue: "user-default.jpg",
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};