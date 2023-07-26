import { Model, BuildOptions } from "sequelize";
import db from "../configs/db";
import Plan from "./plan";
import User from "./user";


interface SignatureAttributes {}

interface SignatureModel extends Model<SignatureAttributes>, SignatureAttributes {};
type SignatureStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SignatureModel;
};

const Signature = <SignatureStatic>db.define("signature", {}, {});

User.belongsToMany(Plan, { through: Signature});
Plan.belongsToMany(User, { through: Signature});

export default Signature;
