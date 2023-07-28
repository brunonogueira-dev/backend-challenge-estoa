import { Model, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from ".";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    planType?: string;
    createdAt: Date;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "planType" | "createdAt"> {}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public planType?: string;
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        planType: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "users",
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
