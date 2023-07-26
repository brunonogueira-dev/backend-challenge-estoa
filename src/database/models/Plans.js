module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(255),
    price: DataTypes.INTEGER,
    expiry_period: DataTypes.STRING(255),
  },
    {
      tableName: 'plans',
      timestamps: false,
    });
    
    Plan.associate = (models) => {
      Plan.hasMany(models.Signatures, {
      foreignKey: 'planId',
      as: 'signatures',
    });
  };


  return Plan;
}