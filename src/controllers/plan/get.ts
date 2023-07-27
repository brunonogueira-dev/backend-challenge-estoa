import Plan from "../../models/plan";
import { IPlanModel } from "../../types/models/plan";


export class GetterByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async get(): Promise<IPlanModel | null> {
        return await Plan.findByPk(this.pk);
    }
}

export class GetterAll {
    constructor () {}

    async get(): Promise<IPlanModel[]> {
        return await Plan.findAll();
    }
}