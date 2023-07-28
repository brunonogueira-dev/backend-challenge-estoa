import { getPlanByPK } from "../../db/planDbHandler";
import { createSignature } from "../../db/signatureDbHandler";
import { getUserByPK } from "../../db/userDbHandlers";
import { ISignatureModel } from "../../types/models/signature";


export default class SignatureCreator {
    private userPK: number;
    private planPK: number;

    constructor(userPK: number, planPK: number) {
        this.userPK = userPK;
        this.planPK = planPK;
    }

    async create(): Promise<ISignatureModel | null> {
        const plan = await getPlanByPK(this.planPK);
        const user = await getUserByPK(this.userPK);

        if (!user || !plan) return null;

        const expireAtValue = new Date();

        const planExpirationInDays = plan.expiration * 30;
        expireAtValue.setDate(expireAtValue.getDate() + planExpirationInDays);

        try {
            const atributes = {
                expiration: expireAtValue,
                userId: user.id,
                planId: plan.id
            };
            return await createSignature(atributes);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}