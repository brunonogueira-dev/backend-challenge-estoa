import { Op } from "sequelize";
import User from "../../models/user";
import { IUserModel } from "../../types/models/user";
import { IFiltereOptions, TValidOperators } from "../../types/controllers/user";


export class Filter {
    constructor() {}

    async filter(options: IFiltereOptions): Promise<IUserModel[]> {
        const whereQuery: any = {};

        if (options.name) {
            whereQuery.name = options.name;
        }

        if (options.createdAt) {
            const createdSplited = options.createdAt.split("__");

            if (createdSplited.length > 1) {
                const operator: TValidOperators = createdSplited[0] as TValidOperators;
                const dateValue = createdSplited[1];
              
                whereQuery.createdAt = { [Op[operator]]: new Date(dateValue).toISOString(), };
            } else {
                whereQuery.createdAt = new Date(options.createdAt).toISOString();
            }
        }

        return await User.findAll({
            where: whereQuery
        });
    }
}
