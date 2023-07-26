import db from "../configs/db";
import Plan from "./plan";
import User from "./user";
import { SignatureStatic } from "../types/models/signature";

const Signature = <SignatureStatic>db.define("signature", {}, {});

User.belongsToMany(Plan, { through: Signature});
Plan.belongsToMany(User, { through: Signature});

export default Signature;
