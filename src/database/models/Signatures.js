module.exports = (sequelize, DataTypes) => {
  const Signatures = sequelize.define('Signatures', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      get() {
        const date = this.getDataValue('createdAt');
        if (date) {
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return null;
      },
    },
    expiryDate: {
      type: DataTypes.STRING(10),
    },
  },
    {
      tableName: 'signature',
      timestamps: true,
      updatedAt: false
    }
  );

  Signatures.associate = (models) => {
    Signatures.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users",
    });
  };

  Signatures.associate = (models) => {
    Signatures.belongsTo(models.Plan, {
      foreignKey: "planId",
      as: "plans",
    });
  };


  return Signatures;
}