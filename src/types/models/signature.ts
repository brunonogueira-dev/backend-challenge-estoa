import { Model, BuildOptions } from "sequelize";

export interface SignatureAttributes {};

export interface SignatureModel extends Model<SignatureAttributes>, SignatureAttributes {};

export type SignatureStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SignatureModel;
};