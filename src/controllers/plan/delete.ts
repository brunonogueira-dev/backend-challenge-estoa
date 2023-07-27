import Plan from "../../models/plan";

export class DeleteByPk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    }

    async delete() {
        const plan = await Plan.findByPk(this.pk);

        if (plan && plan.name !== "free") {
            await plan.destroy();
        } else {
            const error: any = new Error("Plan not found");
            error.status = 404;
            throw error;
        }
    }
}