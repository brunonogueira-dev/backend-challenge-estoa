import { WhereOptions } from "sequelize";
import Plan from "../models/plan";
import { IUpdateOptions } from "../types/controllers/plan";
import { IPlanAttributes, IPlanModel } from "../types/models/plan";

export async function getFreePlan(): Promise<IPlanModel | null> {
    return await Plan.findOne({ where: { name: "free" } });
}

export async function getPlanByPK(pk: number): Promise<IPlanModel | null> {
    return await Plan.findByPk(pk);
}

export async function getAllPlans(whereOptions?: WhereOptions<IPlanAttributes>): Promise<IPlanModel[]> {
    return await Plan.findAll({ where: whereOptions });
}

export async function createPlan(atributes: IPlanAttributes): Promise<IPlanModel | null> {
    const plan = await Plan.create(atributes);

    if (!plan) return null;
  
    await plan.reload();
    return plan;
}

export async function updatePlan(plan: IPlanModel, options: IUpdateOptions) {
    await plan.update({
        name: options.name || plan.name,
        price: options.price || plan.price,
        expiration: options.expiration || plan.expiration
    });

    plan.reload();
}

export async function createFreePlan() {
    const planExists = await Plan.findOne({ where: { name: "free" } });
    if (!planExists) {
        await Plan.create({
            name: "free",
            price: 0,
            expiration: 1
        });
    }
};