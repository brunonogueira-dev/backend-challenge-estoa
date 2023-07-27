import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";

interface PlanAttributes {
    id: number;
    name: string;
    price: number;
    expires_in: number;
    created_at?: Date;
}

export interface PlanInput extends Partial<PlanAttributes> {}
export interface PlanOutput extends Omit<PlanAttributes, "created_at"> {}

class Plan extends Model<PlanAttributes, PlanInput> implements PlanAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public expires_in!: number;
    public type!: string;

    public readonly created_at!: Date;
}

Plan.init(
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
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        expires_in: {
            type: DataTypes.NUMBER,
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
    }
);

export default Plan;
