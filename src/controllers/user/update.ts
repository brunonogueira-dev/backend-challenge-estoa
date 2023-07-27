import User from "../../models/user";
import { IUpdateOptions } from "../../types/controllers/user";
import { IUserModel } from "../../types/models/user";


export class UpdateByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async update(options: IUpdateOptions): Promise<IUserModel> {
        const user = await User.findByPk(this.pk);

        if(user) {
            return await user.update({
                email: options.email || user.email,
                name: options.name || user.name,
                type: options.type || user.type,
                password: options.password || user.password
            });
        } else {
            throw new Error("User not found");
        }
    }
}