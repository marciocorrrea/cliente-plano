'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    title: DataTypes.STRING,
    list: DataTypes.INTEGER,
    client: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    inport: DataTypes.BOOLEAN,
    deactivated: DataTypes.BOOLEAN,
  }, {});
  Plan.associate = function(models) {
  };
  return Plan;
};