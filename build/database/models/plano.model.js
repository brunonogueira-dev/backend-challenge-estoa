"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class PlanoModel extends sequelize_1.Model {
}
PlanoModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    nome: { type: (0, sequelize_1.STRING)(30), allowNull: false },
    periodo: { type: sequelize_1.INTEGER },
    createdAt: { type: sequelize_1.DATE, allowNull: false },
}, { underscored: true,
    sequelize: _1.default,
    modelName: 'planos',
    freezeTableName: true,
    timestamps: true });
// PlanoModel.hasMany(AssinaturaModel, {
//   foreignKey: 'idPlano',
//   as: 'assinaturas',  
// });
exports.default = PlanoModel;
