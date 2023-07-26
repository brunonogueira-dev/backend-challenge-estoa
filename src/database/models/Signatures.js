module.exports = (sequelize, DataTypes) => {
  const Signatures = sequelize.define('Signatures', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
  },
    {
      tableName: 'signatures',
      timestamps: false,
      underscored: true,
    }
  );

  Signatures.associate = (models) => {
    Signatures.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users",
    });
  };

  Signatures.associate = (models) => {
    Signatures.belongsTo(models.Plans, {
      foreignKey: "planId",
      as: "plans",
    });
  };


  return Signatures;
}