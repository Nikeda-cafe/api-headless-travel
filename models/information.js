'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }

    static returnHello(){
        return 'hello'
    }
  }
  information.init({
    group_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    emergency_flag: DataTypes.INTEGER,
    delete_flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'information',
  });
  return information;
};