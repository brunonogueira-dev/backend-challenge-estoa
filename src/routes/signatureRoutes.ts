import { route } from "../server";
import { Request, Response } from 'express';
import { adaptIdFromStringToInteger } from "./adapters/id";
import { GetSignatureByUserPk, GetUserSignaturePk } from "../controllers/signatures/get";
import SignatureCreator from "../controllers/signatures/create";
import User from "../models/user";
import Plan from "../models/plan";
import ChangeSignature from "../controllers/signatures/update";

route.get('/signature-user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureGetter = new GetUserSignaturePk(intId);
        try {
            const user = await signatureGetter.get();

            if (user) {
                const data = { user: user }
                return res.send(data);
            } else {
                return res.status(404).send({ message: 'user related to signature not found'});
            }
        } catch(e: any) {
            return res.status(404).send({ message: 'signature not found'});
        }
    });
});
route.get('/user-signatures/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureGetter = new GetSignatureByUserPk(intId);

        const signatures = await signatureGetter.get();
        return res.send({ signatures: signatures });
    });
});

route.post('/signatures', async (req: Request, res: Response) => {
    const userId = req.body.userId;
    if (!userId) return res.status(400).send({ message: 'need to provide an user id' });

    const planId = req.body.planId;
    if (!planId) return res.status(400).send({ message: 'need to provide an plan id' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send({ message: 'user not found'});

    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).send({ message: 'plan not found'});

    const creator = new SignatureCreator(user, plan);
    const signature = await creator.create();

    if (signature) {
        const data = { signature: signature }
        return res.status(202).send(data);
    } else {
        return res.status(400).send({ message: 'cant create signature' });
    }
});

route.put('/signatures/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const planId = req.body.planId;
    if (!planId) return res.status(400).send({ message: 'need to provide an plan id' });

    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).send({ message: 'plan not found'});

    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureChanger = new ChangeSignature(intId, plan);
        
        try {
            const signature = await signatureChanger.change();
            const data = { signature: signature };
            return res.status(204).send(data);
        } catch(e: any) {
            return res.status(400).send({ message: 'plan cant be updated' });
        }
    });
});