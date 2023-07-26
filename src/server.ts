import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Router, Request, Response } from 'express';
import db from './configs/db';
import User from './models/user';
import Plan from './models/plan';

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

app.use(route)

async function startServer() {
  try {
    await db.sync({ alter: true });
    await User.sync({ alter: true });
    await Plan.sync({ alter: true });
    console.log("Database successfully connected");
  } catch (err) {
    console.log("Error", err);
  }

  app.listen(3333, () => {
    console.log('Server running on port 3333');
  });
}

startServer();