import { Model, BuildOptions } from "sequelize";
import { UserModel } from "./user";

export interface PlanAttributes {
    name: string;
    price: number;
    expiration: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface PlanModel extends Model<PlanAttributes>, PlanAttributes {
    id: number;
    getUsers(): UserModel[];
};

export type PlanStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): PlanModel;
};