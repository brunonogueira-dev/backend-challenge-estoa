import { Op, where } from 'sequelize';
import User from "../../models/user";
import { UserModel } from "../../types/models/user";

type ValidOperators = keyof typeof Op;

interface FiltereOptions {
    name?: string;
    createdAt?: string
}

export class Filter {
    constructor () {}

    async filter(options: FiltereOptions): Promise<UserModel[]> {
        let whereQuery: any = {};

        if (options.name) {
            whereQuery.name = options.name;
        }

        if (options.createdAt) {
            const createdSplited = options.createdAt.split('__');
            if (createdSplited.length > 1) {
              const operator: ValidOperators = createdSplited[0] as ValidOperators;
              const dateValue = createdSplited[1];
              whereQuery.createdAt = {
                [Op[operator]]: dateValue,
              };
            } else {
              whereQuery.createdAt = options.createdAt;
            }
        }

        const users = await User.findAll({
            where: whereQuery
        });

        return users;
    }
}
