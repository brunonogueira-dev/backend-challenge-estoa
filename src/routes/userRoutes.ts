import UserCreator from "../controllers/user/create";
import { DeleteByPk } from "../controllers/user/delete";
import { Filter } from "../controllers/user/filter";
import { GetterAll, GetterByPk } from "../controllers/user/get";
import { route } from "../server";
import { Request, Response } from 'express';
import { adaptIdFromStringToInteger } from "./adapters/id";
import { UpdateByPk } from "../controllers/user/update";


route.get('/users', async (req: Request, res: Response) => {
    const userGetter = new GetterAll();
    const users = await userGetter.get();
    const data = { users: users };
    return res.send(data);
});

route.get('/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    
    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const userGetter = new GetterByPk(intId);
        const user = await userGetter.get();
    
        if (user) {
            const data = { user: user }
            return res.send(data);
        } else {
            return res.status(404).send({ message: 'user not found'});
        }
    });
});

route.get('/users/search', (req: Request, res: Response) => {
    let options: any = {};

    const name = req.query.name;
    if (name) options.name = name;

    const createdAt = req.query.created_at;
    if (createdAt) options.createdAt = createdAt;

    const userFilter = new Filter();

    try {
        const users = userFilter.filter(options);

        const data = { users: users }
        return res.send(data);
    } catch(e: any) {
        return res.status(400).send({ message: e.message });
    }
});

route.post('/users', async (req: Request, res: Response) => {
    const email = req.body.email || "";
    const name = req.body.name || "";
    const password = req.body.password || "";
    const type = req.body.type || "";

    const creator = new UserCreator(email, name, password, type);
    const user = await creator.create();

    if (user) {
        const data = { user: user }
        return res.status(202).send(data);
    } else {
        return res.status(400).send({ message: 'cant create user' });
    }
});

route.delete('/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const userDeletter = new DeleteByPk(intId);
        try {
            await userDeletter.delete();
            const data = { message: 'user deleted' }
            return res.status(201).send(data);
        } catch(e: any) {
            return res.status(400).send({ message: e.message });
        }
    });
});

route.put('/users/:id', async (req: Request, res: Response) => {
    let options: any = {};

    const id = req.params.id;

    const email = req.body.email;
    if (email) options.email = email;

    const name = req.body.name;
    if (name) options.name = name;

    const password = req.body.password;
    if (password) options.password = password;

    const type = req.body.type;
    if (type) options.type = type;

    return await adaptIdFromStringToInteger(id, res, async (intId: number) => {
        const userUpdatter = new UpdateByPk(intId);
        
        try {
            const user = await userUpdatter.update(options);
            const data = { user: user };
            return res.status(204).send(data);
        } catch(e: any) {
            return res.status(400).send({ message: 'user cant be updated' });
        }
    });
});