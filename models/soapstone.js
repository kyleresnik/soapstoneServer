module.exports = (sequelize, DataTypes) => {
  const Soapstone = sequelize.define('soapstone', {
    tip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 300]
      }
    }
  })
  return Soapstone;
}