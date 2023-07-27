import db from "../configs/db";
import Plan from "./plan";
import User from "./user";
import { SignatureStatic } from "../types/models/signature";
import { DataTypes } from "sequelize";

const Signature = <SignatureStatic>db.define("signature", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    expiration:  {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

User.belongsToMany(Plan, { through: { model: Signature, unique: false } });
Plan.belongsToMany(User, { through: { model: Signature, unique: false } });

export default Signature;
