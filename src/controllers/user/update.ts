import { getUserByPK, updateUser } from "../../db/userDbHandlers";
import { IUpdateOptions } from "../../types/controllers/user";
import { IUserModel } from "../../types/models/user";


export class UpdateByPk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    }

    async update(options: IUpdateOptions): Promise<IUserModel> {
        const user = await getUserByPK(this.pk);

        if (user) {
            await updateUser(user, options);
            return user;
        } else {
            const error: any = new Error("User not found");
            error.status = 404;
            throw error;
        }
    }
}