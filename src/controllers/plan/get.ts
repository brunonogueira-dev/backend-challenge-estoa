import { getAllPlans, getPlanByPK } from "../../db/planDbHandler";
import { IPlanModel } from "../../types/models/plan";


export class GetterByPk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    }

    async get(): Promise<IPlanModel | null> {
        return await getPlanByPK(this.pk);
    }
}

export class GetterAll {
    constructor() {}

    async get(): Promise<IPlanModel[]> {
        return await getAllPlans();
    }
}