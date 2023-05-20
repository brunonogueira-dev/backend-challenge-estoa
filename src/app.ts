import express from 'express';

import planoRouter from './routes/plano.route';

const app = express();

app.use(express.json());

app.use('/', planoRouter);

export default app;