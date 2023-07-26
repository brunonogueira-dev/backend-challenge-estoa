import Signature from "../../models/signature";
import { PlanModel } from "../../types/models/plan";
import { SignatureModel } from "../../types/models/signature";

export default class ChangeSignature {
    private signatureId: number;
    private plan: PlanModel;

    constructor (signatureId: number, plan: PlanModel) {
        this.signatureId = signatureId
        this.plan = plan
    };

    async change(): Promise<SignatureModel> {
        const signature = await Signature.findByPk(this.signatureId);
        if (signature) {
            return await signature.update({
                planId: this.plan.id
            });
        } else {
            throw new Error("Signature not found");
        }
    };
};