import { Model, BuildOptions } from "sequelize";

export interface ISignatureAttributes {
    readonly id?: number,
    readonly expiration?: Date;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly userId: number,
    readonly planId: number
};

export interface ISignatureModel extends Model<ISignatureAttributes>, ISignatureAttributes {
    id: number
};

export type TSignatureStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISignatureModel;
};