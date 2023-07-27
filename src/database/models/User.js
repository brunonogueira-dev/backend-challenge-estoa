module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    typeUser: DataTypes.STRING(255),
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
      tableName: 'users',
      timestamps: true,
      updatedAt: false
    });
    
  User.associate = (models) => {
    User.hasMany(models.Signatures, {
      foreignKey: 'userId',
      as: 'signatures',
    });
  };


  return User;
}