import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class PlanoModel extends Model {
  declare id: number;

  declare nome: string;

  declare preco: number;

  declare periodo: number;

  declare createdAt: Date;
}

PlanoModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  nome: { type: STRING(30), allowNull: false },
  periodo: { type: INTEGER },
  preco: { type: INTEGER },
  createdAt: { type: DATE, allowNull: false },
}, { underscored: true,
  sequelize: db,
  modelName: 'planos',
  freezeTableName: true,
  timestamps: true,
  updatedAt: false });

export default PlanoModel;