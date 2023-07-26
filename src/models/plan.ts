import { DataTypes, Model, BuildOptions } from "sequelize";
import db from "../configs/db";
import { UserModel } from "./user";


interface PlanAttributes {
    name: string;
    price: number;
    expiration: number;
}

export interface PlanModel extends Model<PlanAttributes>, PlanAttributes {
    id: number;
    getUsers(): UserModel[];
};
export type PlanStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): PlanModel;
};

const Plan = <PlanStatic>db.define("plan",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "plan"
    }
);

export default Plan;
