import User from "../../models/user";

interface UpdateOptions {
    email?: string;
    name?: string;
    type?: string;
    password?: string;
}

export class UpdateByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async update(options: UpdateOptions) {
        const user = await User.findByPk(this.pk);

        if(user) {
            await user.update({
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