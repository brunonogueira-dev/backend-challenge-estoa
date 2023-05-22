import { Request, Response, NextFunction } from 'express';

export  default function nomeMiddleware(req: Request, res: Response, next: NextFunction) {
  const { nome } = req.body;

  if (!nome) {
    return res.status(404).json({ message: 'Informe o "nome"' });
  }

  if (typeof (nome) !== 'string') {
    return res.status(404)
      .json({ message: 'A propiedade "nome" deve conter uma string' });
  }

  return next();
}