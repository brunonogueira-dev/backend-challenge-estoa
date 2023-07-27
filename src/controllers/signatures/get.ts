import Signature from "../../models/signature";
import User from "../../models/user";
import { ISignatureModel } from "../../types/models/signature";
import { IUserModel } from "../../types/models/user";

export class GetSignatureByUserPk {
    private userId: number;

    constructor(userId: number) {
        this.userId = userId;
    };

    async get(): Promise<ISignatureModel[]> {
        return await Signature.findAll({
            where: {
                userId: this.userId
            }
        });
    }
}

export class GetUserSignaturePk {
    private pk: number;

    constructor(pk: number) {
        this.pk = pk;
    };

    async get(): Promise<IUserModel | null> {
        const signature = await Signature.findByPk(this.pk);
        
        if (signature) {
            return await User.findByPk(signature.userId);
        } else {
            return null;
        }
    }
}