import { Request, Response } from 'express';
import PlanoService from '../service/plano.service';

export default class PlanoController {
  public service = new PlanoService();

  public async listarPlanos(_req: Request, res: Response) {
    const lista = await this.service.listarPlanos();

    return res.status(200).json({ lista });
  }
}