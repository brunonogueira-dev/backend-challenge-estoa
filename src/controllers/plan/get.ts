import Plan from "../../models/plan";
import { PlanModel } from "../../types/models/plan";

type TGetOne = PlanModel | null;

export class GetterByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async get(): Promise<TGetOne> {
        return await Plan.findByPk(this.pk);
    }
}

export class GetterAll {
    constructor () {}

    async get(): Promise<PlanModel[]> {
        return await Plan.findAll();
    }
}