"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const plano_model_1 = __importDefault(require("./plano.model"));
const usuario_model_1 = __importDefault(require("./usuario.model"));
class AssinaturaModel extends sequelize_1.Model {
}
AssinaturaModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    idPlano: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    idUsuario: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    createdAt: { type: sequelize_1.DATE, allowNull: false },
    dataDeExpiracao: { type: sequelize_1.DATE, allowNull: false },
}, { underscored: true,
    sequelize: _1.default,
    modelName: 'assinaturas',
    freezeTableName: true,
    timestamps: true });
AssinaturaModel.belongsTo(plano_model_1.default, {
    foreignKey: 'idPlano',
    as: 'planos',
});
AssinaturaModel.belongsTo(usuario_model_1.default, {
    foreignKey: 'idUsuario',
    as: 'usuarios',
});
exports.default = AssinaturaModel;
