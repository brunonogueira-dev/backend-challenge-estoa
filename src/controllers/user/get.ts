import { getAllUsers, getUserByPK } from "../../db/userDbHandlers";
import { IUserModel } from "../../types/models/user";


export class GetterByPk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    }

    async get(): Promise<IUserModel | null> {
        return await getUserByPK(this.pk);
    }
}

export class GetterAll {
    constructor() {}

    async get(): Promise<IUserModel[]> {
        return await getAllUsers();
    }
}
