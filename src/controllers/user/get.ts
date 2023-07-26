import User from "../../models/user";
import { UserModel } from "../../types/models/user";

type TGetOne = UserModel | null;

export class GetterByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async get(): Promise<TGetOne> {
        return await User.findByPk(this.pk);
    }
}

export class GetterAll {
    constructor () {}

    async get(): Promise<UserModel[]> {
        return await User.findAll();
    }
}
