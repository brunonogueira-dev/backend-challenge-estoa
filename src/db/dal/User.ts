import { Op } from "sequelize";
import { isEmpty } from "lodash";
import User, { UserInput, UserOutput } from "../models/User";

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload);

    return user;
};

export const findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
    const [user] = await User.findOrCreate({
        where: {
            name: payload.name,
        },
        defaults: payload,
    });

    return user;
};

export const update = async (
    id: number,
    payload: Partial<UserInput>
): Promise<UserOutput> => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("User not found");
    }

    const updatedUser = await user.update(payload);
    return updatedUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: { id },
    });

    return !!deletedUserCount;
};

export const getAll = async (): Promise<UserOutput[]> => {
    return User.findAll({
        where: {
            ...{ deletedAt: { [Op.not]: null } },
        },
    });
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    const userWithEmail = await User.findOne({
        where: {
            email,
        },
    });

    return !isEmpty(userWithEmail);
};
