import { Model, BuildOptions } from "sequelize";

export interface IUserAttributes {
    name: string;
    email: string;
    password: string;
    type: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface IUserModel extends Model<IUserAttributes>, IUserAttributes {
    id: number;
};

export type TAuthentication = Promise<IUserModel | null>;

export type TUserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IUserModel;
    authenticate(email: string, password: string): TAuthentication;
};