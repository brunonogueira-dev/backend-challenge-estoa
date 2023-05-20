import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class UsuarioModel extends Model {
  declare id: number;

  declare nome: string;

  declare senha: string;

  declare tipo: string;

  declare createdAt: Date;
}

UsuarioModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  nome: { type: STRING(30) },
  senha: { type: STRING(30) },
  tipo: { type: STRING(30) },
  createdAt: { type: DATE, allowNull: false },
}, { underscored: true,
  sequelize: db,
  modelName: 'usuarios',
  freezeTableName: true,
  timestamps: true });

export default UsuarioModel;