import User from "../../models/user";
import { IUserModel } from "../../types/models/user";


export class GetterByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async get(): Promise<IUserModel | null> {
        return await User.findByPk(this.pk);
    }
}

export class GetterAll {
    constructor () {}

    async get(): Promise<IUserModel[]> {
        return await User.findAll();
    }
}
