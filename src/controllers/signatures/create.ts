import Signature from "../../models/signature";
import { IPlanModel } from "../../types/models/plan";
import { ISignatureModel } from "../../types/models/signature";
import { IUserModel } from "../../types/models/user";


export default class SignatureCreator {
    private user: IUserModel;
    private plan: IPlanModel;

    constructor(user: IUserModel, plan: IPlanModel) {
        this.user = user;
        this.plan = plan;
    }

    async create(): Promise<ISignatureModel | null> {
        const expireAtValue = new Date();

        const planExpirationInDays = this.plan.expiration * 30;
        expireAtValue.setDate(expireAtValue.getDate() + planExpirationInDays);

        try {
            const newSignature = await Signature.create({
                expiration: expireAtValue,
                userId: this.user.id,
                planId: this.plan.id
            });
            newSignature.reload();
            return newSignature;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}