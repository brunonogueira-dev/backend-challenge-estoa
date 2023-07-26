import { Model, BuildOptions } from "sequelize";
import { PlanModel } from "./plan";
import { UserModel } from "./user";

export interface SignatureAttributes {
    readonly id?: number,
    readonly expiration?: Date;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly userId: number,
    readonly planId: number
};

export interface SignatureModel extends Model<SignatureAttributes>, SignatureAttributes {
    id: number,
    getPlans(): PlanModel[],
    getUsers(): UserModel[]
};

export type SignatureStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SignatureModel;
};