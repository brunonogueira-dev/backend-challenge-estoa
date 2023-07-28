import Signature from "../models/signature";
import { ISignatureAttributes, ISignatureModel } from "../types/models/signature";

export async function getByPK(pk: number): Promise<ISignatureModel | null>  {
    return await Signature.findByPk(pk);
}

export async function getByUserPk(pk: number): Promise<ISignatureModel[]> {
    return await Signature.findAll({
        where: {
            userId: pk
        }
    });
}

export async function changePlan(signature: ISignatureModel, planId: number): Promise<ISignatureModel>  {
    await signature.set({ planId: planId });
    return await signature.save();
}

export async function createSignature(options: ISignatureAttributes): Promise<ISignatureModel> {
    const newSignature = await Signature.create(options);
    newSignature.reload();
    return newSignature;
}