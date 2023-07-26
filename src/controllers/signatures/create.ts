import Signature from "../../models/signature";
import { PlanModel } from "../../types/models/plan";
import { SignatureModel } from "../../types/models/signature";
import { UserModel } from "../../types/models/user";

type TCreator = SignatureModel | null; 

export default class SignatureCreator {
    private user: UserModel;
    private plan: PlanModel;

    constructor (user: UserModel, plan: PlanModel) {
        this.user = user;
        this.plan = plan;
    }

    async create(): Promise<TCreator> {
        let expireAtValue = new Date();

        const planExpirationInDays = this.plan.expiration * 30;
        expireAtValue.setDate(expireAtValue.getDate() + planExpirationInDays);

        try{
            const newSignature = await Signature.create({
                expiration: expireAtValue,
                userId: this.user.id,
                planId: this.plan.id
            });
            return newSignature;
        } catch(e) {
            console.log(e);
            return null;
        }
    }
}