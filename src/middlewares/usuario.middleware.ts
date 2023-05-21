import { Request, Response, NextFunction } from 'express';

export function existeMiddleware(req: Request, res: Response, next: NextFunction) {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(404).json({ message: 'Informe todas as propriedades' });
  }

  return next();
}

export function typesMiddleware(req: Request, res: Response, next: NextFunction) {
  const { nome, senha } = req.body;
  
  if (typeof (nome) !== 'string' || typeof (senha) !== 'string') {
    return res.status(404)
      .json({ message: 'As propiedades "nome" e "senha" devem conter strings' });
  }
  return next();
}