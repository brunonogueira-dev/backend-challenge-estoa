import { Model, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from ".";

interface PlanAttributes {
    id: string;
    name: string;
    price: number;
    expiresIn: number;
    createdAt: Date;
}

interface PlanCreationAttributes
    extends Optional<PlanAttributes, "id" | "createdAt"> {}

class Plan
    extends Model<PlanAttributes, PlanCreationAttributes>
    implements PlanAttributes
{
    public id!: string;
    public name!: string;
    public price!: number;
    public expiresIn!: number;
    public createdAt!: Date;
}

Plan.init(
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
                    msg: "Plan must have a name",
                },
            },
        },
        price: {
            type: DataTypes.FLOAT(5, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Price cannot be empty",
                },
                notNull: {
                    msg: "Plan must have a price",
                },
            },
        },
        expiresIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Expiration period cannot be empty",
                },
                notNull: {
                    msg: "Plan must have an expiration period in months.",
                },
            },
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "plans",
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        updatedAt: false,
    }
);

export default Plan;
