import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Router, Request, Response } from 'express';
import db from './configs/db';

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

db
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(3333, () => {console.log('server running on port 3333')});