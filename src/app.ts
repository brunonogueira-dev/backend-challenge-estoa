import express from 'express';

import planoRouter from './routes/plano.route';

import usuarioRouter from './routes/usuario.routes';

const app = express();

app.use(express.json());

app.use('/', planoRouter);

app.use('/', usuarioRouter);

export default app;