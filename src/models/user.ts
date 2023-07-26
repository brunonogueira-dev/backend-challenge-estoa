import { DataTypes } from "sequelize";
import db from "../configs/db";
import bcrypt from "bcryptjs";
import { UserStatic, TAuthentication } from "../types/models/user";



const User = <UserStatic>db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [4, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 255]
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 255]
        }
    }
}, {
    tableName: "user",
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        }
    }
});

User.authenticate = async function (email: string, password: string): TAuthentication {
    const user = await this.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
};

export default User;