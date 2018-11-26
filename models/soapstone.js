module.exports = function(sequelize, DataTypes) {
  return sequelize.define('soapstone', {
    // owner: DataTypes.INTEGER,
    soaptext: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};