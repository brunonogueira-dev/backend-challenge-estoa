import Plan from "../../models/plan";

export class DeleteByPk {
    private pk: number;

    constructor (pk: number) {
        this.pk = pk
    }

    async delete() {
        const user = await Plan.findByPk(this.pk);

        if(user) {
            await user.destroy();
        } else {
            throw new Error("Plan not found");
        }
    }
}