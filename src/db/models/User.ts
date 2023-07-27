import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../config";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    type?: string;
    createdAt: Date;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "type" | "createdAt"> {}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public type?: string;
    public createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        updatedAt: false,
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
    }
);

export default User;
