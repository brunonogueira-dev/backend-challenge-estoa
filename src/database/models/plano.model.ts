import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';
// import AssinaturaModel from './assinatura.model';

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
  nome: { type: STRING(30) },
  periodo: { type: INTEGER },
  createdAt: { type: DATE, allowNull: false },
}, { underscored: true,
  sequelize: db,
  modelName: 'planos',
  freezeTableName: true,
  timestamps: true });

// PlanoModel.hasMany(AssinaturaModel, {
//   foreignKey: 'idPlano',
//   as: 'assinaturas',  
// });

export default PlanoModel;