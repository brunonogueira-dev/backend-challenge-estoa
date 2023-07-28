import { WhereOptions } from "sequelize";
import User from "../models/user";
import { IUpdateOptions } from "../types/controllers/user";
import { IUserAttributes, IUserModel } from "../types/models/user";

export async function getUserByPK(pk: number): Promise<IUserModel | null> {
    return await User.findByPk(pk);
}

export async function getAllUsers(whereOptions?: WhereOptions<IUserAttributes>): Promise<IUserModel[]> {
    return await User.findAll({ where: whereOptions });
}

export async function createUser(atributes: IUserAttributes): Promise<IUserModel | null> {
    const user = await User.create(atributes);

    if (!user) return null;
  
    await user.reload();
    return user;
}

export async function updateUser(user: IUserModel, options: IUpdateOptions) {
    await user.update({
        email: options.email || user.email,
        name: options.name || user.name,
        type: options.type || user.type,
        password: options.password || user.password
    });

    user.reload();
}