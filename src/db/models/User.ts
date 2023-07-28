import { Model, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelizeConnection from "../config/config";

interface UserAttributes {
    id: string;
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
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public type?: string;
    public createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty",
                },
                notNull: {
                    msg: "User must have a name",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Email cannot be empty",
                },
                notNull: {
                    msg: "User must have an email",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password cannot be empty",
                },
                notNull: {
                    msg: "User must have a password",
                },
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Type cannot be empty",
                },
                notNull: {
                    msg: "User must have a type",
                },
            },
        },
        createdAt: {
            type: DataTypes.DATEONLY,
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
