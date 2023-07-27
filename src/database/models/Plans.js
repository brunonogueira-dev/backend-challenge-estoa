module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(255),
    price: DataTypes.INTEGER,
    expiryPeriod: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      get() {
        const date = this.getDataValue('createdAt');
        if (date) {
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        }
        return null;
      },
    }, 
  },
    {
      tableName: 'plans',
      timestamps: true,
      updatedAt: false
    });
    
    Plan.associate = (models) => {
      Plan.hasMany(models.Signatures, {
      foreignKey: 'planId',
      as: 'signatures',
    });
  };


  return Plan;
}