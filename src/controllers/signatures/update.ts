import Signature from "../../models/signature";
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
        const signature = await Signature.findByPk(this.signatureId);
        if (signature) {
            await signature.set({ planId: this.plan.id });
            return await signature.save();
        } else {
            throw new Error("Signature not found");
        }
    };
};