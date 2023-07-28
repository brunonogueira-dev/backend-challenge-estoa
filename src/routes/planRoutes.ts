import { GetterAll, GetterByPk } from "../controllers/plan/get";
import { Request, Response, Router } from "express";
import { adaptIdFromStringToInteger } from "./adapters/id";
import { DeleteByPk } from "../controllers/plan/delete";
import PlanCreator from "../controllers/plan/create";
import { UpdateByPk } from "../controllers/plan/update";


const planRouter = Router();

planRouter.get("/", async(req: Request, res: Response) => {
    const planGetter = new GetterAll();
    const plans = await planGetter.get();
    const data = { plans: plans };
    return res.send(data);
});

planRouter.get("/:id", async(req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async(intId: number) => {
        const planGetter = new GetterByPk(intId);
        const plan = await planGetter.get();

        if (plan) {
            const data = { plan: plan };
            return res.send(data);
        } else {
            return res.status(404).send({ message: "Plan not found" });
        }
    });
});

planRouter.post("/", async(req: Request, res: Response) => {
    const name = req.body.name || "";
    const expiration = req.body.expiration || "";
    const price = req.body.price || "";

    const creator = new PlanCreator(name, price, expiration);
    const plan = await creator.create();

    if (plan) {
        const data = { plan: plan };
        return res.status(202).send(data);
    } else {
        return res.status(400).send({ message: "cant create plan" });
    }
});

planRouter.delete("/:id", async(req: Request, res: Response) => {
    const id = req.params.id;

    return await adaptIdFromStringToInteger(id, res, async(intId: number) => {
        const planDeletter = new DeleteByPk(intId);

        try {
            await planDeletter.delete();
            const data = { message: "plan deleted" };
            return res.status(201).send(data);
        } catch (e: any) {
            return res.status(e.status || 400).send({ message: e.message });
        }
    });
});

planRouter.put("/:id", async(req: Request, res: Response) => {
    const options: any = {};

    const id = req.params.id;

    const name = req.body.name;
    if (name) options.name = name;

    const price = req.body.price;
    if (price) options.price = price;

    const expiration = req.body.expiration;
    if (expiration) options.expiration = expiration;

    return await adaptIdFromStringToInteger(id, res, async(intId: number) => {
        const planUpdatter = new UpdateByPk(intId);
        
        try {
            const plan = await planUpdatter.update(options);
            const data = { plan: plan };
            return res.status(200).send(data);
        } catch (e: any) {
            return res.status(e.status || 400).send({ message: e.message });
        }
    });
});

export default planRouter;