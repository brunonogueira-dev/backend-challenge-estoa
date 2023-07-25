import { DataTypes, Model, BuildOptions } from "sequelize";
import db from "../configs/db";
import bcrypt from "bcryptjs";

type TAuthentication = Promise<UserModel | null>;

interface UserAttributes {
    name: string;
    email: string;
    password: string;
    type: string;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {};
type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
    authenticate(email: string, password: string): TAuthentication;
};

const User = <UserStatic>db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
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