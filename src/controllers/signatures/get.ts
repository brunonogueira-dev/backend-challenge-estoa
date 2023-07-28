import { getByPK, getByUserPk } from "../../db/signatureDbHandler";
import { getUserByPK } from "../../db/userDbHandlers";
import { ISignatureModel } from "../../types/models/signature";
import { IUserModel } from "../../types/models/user";

export class GetSignatureByUserPk {
    private userId: number;

    constructor(userId: number) {
        this.userId = userId;
    };

    async get(): Promise<ISignatureModel[]> {
        return await getByUserPk(this.userId);
    }
}

export class GetUserSignaturePk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    };

    async get(): Promise<IUserModel | null> {
        const signature = await getByPK(this.pk);
        
        if (signature) {
            return await getUserByPK(signature.userId);
        } else {
            return null;
        }
    }
}