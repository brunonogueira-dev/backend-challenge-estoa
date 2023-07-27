import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Router, Request, Response } from 'express';
import db from './configs/db';
import User from './models/user';
import Plan from './models/plan';
import Signature from './models/signature';

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const route = Router();

route.get('/plans', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.get('/plans/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.post('/plans', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.delete('/plans/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.put('/plans/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});

route.get('/users', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.get('/users/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.get('/users/q?name=&&created_at=', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.post('/users', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.delete('/users/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.put('/users/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});

route.get('/signature-user/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.get('/user-signatures/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.post('/signatures', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
route.put('/signatures/:id', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});

app.use(route);

async function startServer() {
  try {
    await db.sync();
    await User.sync();
    await Plan.sync();
    await Signature.sync();

    const planExists = await Plan.findOne({where: {name: 'free'}});
    if (!planExists) {
      await Plan.create({
        name: 'free',
        price: 0,
        expiration: 1
      })
    }

    console.log("Database successfully connected");
  } catch (err) {
    console.log("Error", err);
  }

  app.listen(3333, () => {
    console.log('Server running on port 3333');
  });
}

startServer();