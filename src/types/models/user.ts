import { Model, BuildOptions } from "sequelize";
import { PlanModel } from "./plan";

export type TAuthentication = Promise<UserModel | null>;

export interface UserAttributes {
    name: string;
    email: string;
    password: string;
    type: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {
    id: number;
    getPlans(): PlanModel[];
    addPlan(plan: PlanModel): null;
};

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
    authenticate(email: string, password: string): TAuthentication;
};