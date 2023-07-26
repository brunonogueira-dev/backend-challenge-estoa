import { DataTypes } from "sequelize";
import db from "../configs/db";
import { PlanStatic } from "../types/models/plan";


const Plan = <PlanStatic>db.define("plan",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "plan"
    }
);

export default Plan;
