import User from "../../models/user";

export class DeleteByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async delete() {
        const user = await User.findByPk(this.pk);

        if(user) {
            await user.destroy();
        } else {
            throw new Error("User not found");
        }
    }
}