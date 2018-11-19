module.exports = (sequelize, DataTypes) => {
  return sequelize.define('soapstone', {
    soaptext: DataTypes.STRING,
    owner: DataTypes.INTEGER
  });
};

// soaptext: {
//   owner: DataTypes.INTEGER,
//   type: DataTypes.STRING,
//   allowNull: false,
// })
// return Soapstone;