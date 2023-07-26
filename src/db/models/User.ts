import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    type: string;
    created_at?: Date;
}

export interface UserInput extends Partial<UserAttributes> {}
export interface UserOutput extends Omit<UserAttributes, "created_at"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public type!: string;

    public readonly created_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
    }
);

export default User;
