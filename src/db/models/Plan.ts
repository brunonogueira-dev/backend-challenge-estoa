import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";

interface PlanAttributes {
    id: number;
    name: string;
    price: number;
    expiresIn: number;
    createdAt: Date;
}

class Plan extends Model<PlanAttributes> implements PlanAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public expiresIn!: number;
    public createdAt!: Date;
}

Plan.init(
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
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        expiresIn: {
            type: DataTypes.NUMBER,
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
    }
);

export default Plan;
