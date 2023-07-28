import { Model, BuildOptions } from "sequelize";

export interface IPlanAttributes {
    name: string;
    price: number;
    expiration: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface IPlanModel extends Model<IPlanAttributes>, IPlanAttributes {
    id: number;
};

export type TPlanStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IPlanModel;
};