import { Model, BuildOptions } from "sequelize";

export type TAuthentication = Promise<UserModel | null>;

export interface UserAttributes {
    name: string;
    email: string;
    password: string;
    type: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {
    id: number;
};

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
    authenticate(email: string, password: string): TAuthentication;
};