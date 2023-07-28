import { changePlan, getByPK } from "../../db/signatureDbHandler";
import { IPlanModel } from "../../types/models/plan";
import { ISignatureModel } from "../../types/models/signature";

export default class ChangeSignature {
    private signatureId: number;
    private plan: IPlanModel;

    constructor(signatureId: number, plan: IPlanModel) {
        this.signatureId = signatureId;
        this.plan = plan;
    };

    async change(): Promise<ISignatureModel> {
        const signature = await getByPK(this.signatureId);
        if (signature) {
            return await changePlan(signature, this.plan.id);
        } else {
            throw new Error("Signature not found");
        }
    };
};