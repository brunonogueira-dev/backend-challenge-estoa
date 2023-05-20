import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import PlanoModel from './plano.model';
import UsuarioModel from './usuario.model';

class AssinaturaModel extends Model {
  declare id: number;

  declare idPlano: number;

  declare idUsuario: number;

  declare createdAt: Date;

  declare dataDeExpiracao: Date;
}

AssinaturaModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  idPlano: {
    allowNull: false,
    type: INTEGER,
  },
  idUsuario: {
    allowNull: false,
    type: INTEGER,
  },
  createdAt: { type: DATE, allowNull: false },
  dataDeExpiracao: { type: DATE, allowNull: false },
}, { underscored: true,
  sequelize: db,
  modelName: 'assinaturas',
  freezeTableName: true,
  timestamps: true });

AssinaturaModel.belongsTo(PlanoModel, {
  foreignKey: 'idPlano',
  as: 'planos',
});

AssinaturaModel.belongsTo(UsuarioModel, {
  foreignKey: 'idUsuario',
  as: 'usuarios',
});

export default AssinaturaModel;