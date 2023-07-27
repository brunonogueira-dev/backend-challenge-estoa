import { Request, Response, Router } from 'express';
import { adaptIdFromStringToInteger } from "./adapters/id";
import { GetSignatureByUserPk, GetUserSignaturePk } from "../controllers/signatures/get";
import SignatureCreator from "../controllers/signatures/create";
import User from "../models/user";
import Plan from "../models/plan";
import ChangeSignature from "../controllers/signatures/update";


const signatureRouter = Router();

signatureRouter.get('/get-user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureGetter = new GetUserSignaturePk(intId);
        try {
            const user = await signatureGetter.get();

            if (user) {
                const userJson = user.toJSON();
                const data = { user: userJson }
                return res.send(data);
            } else {
                return res.status(404).send({ message: 'user related to signature not found'});
            }
        } catch(e: any) {
            return res.status(404).send({ message: 'signature not found'});
        }
    });
});
signatureRouter.get('/get-by-user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureGetter = new GetSignatureByUserPk(intId);

        const signatures = await signatureGetter.get();
        return res.send({ signatures: signatures });
    });
});

signatureRouter.post('/', async (req: Request, res: Response) => {
    const userId = req.body.userId;
    if (!userId) return res.status(400).send({ message: 'need to provide an user id' });

    const planId = req.body.planId;
    if (!planId) return res.status(400).send({ message: 'need to provide an plan id' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send({ message: 'User not found'});

    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).send({ message: 'Plan not found'});

    const creator = new SignatureCreator(user, plan);
    const signature = await creator.create();

    if (signature) {
        const signatureJson = signature.toJSON();
        const data = { signature: signatureJson };
        return res.status(201).send(data);
    } else {
        return res.status(400).send({ message: 'cant create signature' });
    }
});

signatureRouter.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const planId = req.body.planId;
    if (!planId) return res.status(400).send({ message: 'need to provide an plan id' });

    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).send({ message: 'Plan not found'});

    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const signatureChanger = new ChangeSignature(intId, plan);
        
        try {
            const signature = await signatureChanger.change();
            const signatureJson = signature.toJSON();
            const data = { signature: signatureJson };
            return res.status(200).send(data);
        } catch(e: any) {
            return res.status(400).send({ message: 'plan cant be updated' });
        }
    });
});

export default signatureRouter;