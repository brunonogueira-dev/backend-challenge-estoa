import { Request, Response, NextFunction } from 'express';
import PlanoModel from '../database/models/plano.model';
import { IPlano } from '../interfaces/IPlano';

export default async function tipoMiddleware(req: Request, res: Response, next: NextFunction) {
  const { tipo } = req.body;

  if (!tipo) {
    return res.status(404).json({ message: 'Informe todas as propriedades' });
  }

  if (typeof (tipo) !== 'string') {
    return res.status(404)
      .json({ message: 'A propiedade "tipo" deve conter string' });
  }

  const lista: IPlano[] = await PlanoModel.findAll();
  const planos = lista.map((plano) => plano.nome);
  const bool = planos.some((plano) => plano === tipo);

  if (!bool) {
    return res.status(404)
      .json({ message: 'Escolha um plano existente' }); 
  }

  return next();
}