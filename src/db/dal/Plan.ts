import { Op } from "sequelize";
import Plan, { PlanInput, PlanOutput } from "../models/Plan";

export const create = async (payload: PlanInput): Promise<PlanOutput> => {
    const plan = await Plan.create(payload);

    return plan;
};

export const findOrCreate = async (payload: PlanInput): Promise<PlanOutput> => {
    const [plan] = await Plan.findOrCreate({
        where: {
            name: payload.name,
        },
        defaults: payload,
    });

    return plan;
};

export const update = async (
    id: number,
    payload: Partial<PlanInput>
): Promise<PlanOutput> => {
    const plan = await Plan.findByPk(id);

    if (!plan) {
        throw new Error("Plan not found");
    }

    const updatedPlan = await plan.update(payload);
    return updatedPlan;
};

export const getById = async (id: number): Promise<PlanOutput> => {
    const plan = await Plan.findByPk(id);

    if (!plan) {
        throw new Error("Plan not found");
    }

    return plan;
};

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPlanCount = await Plan.destroy({
        where: { id },
    });

    return !!deletedPlanCount;
};

export const getAll = async (): Promise<PlanOutput[]> => {
    return Plan.findAll({
        where: {
            ...{ deletedAt: { [Op.not]: null } },
        },
    });
};
