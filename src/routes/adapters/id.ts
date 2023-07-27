import { Response } from 'express';


export async function adaptIdFromStringToInteger(id: string, res: Response, callback: (intId: number) => any) {
    try {
        const intId = parseInt(id);
        if (isNaN(intId)) {
            throw new Error("id needs to be an integer");
        } else {
            return await callback(intId);
        }
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}