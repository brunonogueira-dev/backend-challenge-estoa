import { Request, Response, NextFunction } from 'express';

export function existeMiddleware(req: Request, res: Response, next: NextFunction) {
  const { nome, periodo, preco } = req.body;

  if (!nome || !periodo || !preco) {
    return res.status(404).json({ message: 'Informe todas as propriedades' });
  }

  return next();
}

export function positiveMiddleware(req: Request, res: Response, next: NextFunction) {
  const { periodo, preco } = req.body;
  if (periodo < 0 || preco < 0) {
    return res.status(404)
      .json({ message: 'As propiedades "periodo" e "preco" não devem ser negativos' });
  }

  next();
}

export function typesMiddleware(req: Request, res: Response, next: NextFunction) {
  const { nome, periodo, preco } = req.body;
  
  if (typeof (periodo) !== 'number' || typeof (preco) !== 'number') {
    return res.status(404)
      .json({ message: 'As propiedades "periodo" e "preco" devem conter números' });
  }
  
  if (typeof (nome) !== 'string') {
    return res.status(404)
      .json({ message: 'A propiedade "nome" deve conter uma string' });
  }
  return next();
}