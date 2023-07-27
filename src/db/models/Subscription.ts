import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import User from "./User";
import Plan from "./Plan";

interface SubscriptionAttributes {
    id: number;
    userId: number;
    planId: number;
    expirationDate: Date;
    createdAt: Date;
}

interface SubscriptionCreationAttributes
    extends Optional<SubscriptionAttributes, "id" | "createdAt"> {}

class Subscription
    extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
    implements SubscriptionAttributes
{
    public id!: number;
    public userId!: number;
    public planId!: number;
    public expirationDate!: Date;
    public createdAt!: Date;
}

Subscription.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        planId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Plan,
                key: "id",
            },
        },
        expirationDate: {
            type: DataTypes.DATE,
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

Subscription.belongsTo(Plan, {
    foreignKey: "planId",
    as: "plans",
});

Subscription.belongsTo(User, {
    foreignKey: "userId",
    as: "users",
});

export default Subscription;
