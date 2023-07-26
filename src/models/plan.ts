import { DataTypes } from "sequelize";
import db from "../configs/db";
import { PlanStatic } from "../types/models/plan";


const Plan = <PlanStatic>db.define("plan",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 255]
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        expiration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        }
    },
    {
        tableName: "plan"
    }
);

export default Plan;
