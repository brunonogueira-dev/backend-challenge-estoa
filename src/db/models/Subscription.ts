import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../config/config";
import { v4 as uuidv4 } from "uuid";
import User from "./User";
import Plan from "./Plan";

interface SubscriptionAttributes {
    id: string;
    userId: string;
    planId: string;
    expirationDate: Date;
    createdAt: Date;
}

interface SubscriptionCreationAttributes
    extends Optional<SubscriptionAttributes, "id" | "createdAt"> {}

class Subscription
    extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
    implements SubscriptionAttributes
{
    public id!: string;
    public userId!: string;
    public planId!: string;
    public expirationDate!: Date;
    public createdAt!: Date;
}

Subscription.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            references: {
                model: User,
                key: "id",
            },
        },
        planId: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            references: {
                model: Plan,
                key: "id",
            },
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
