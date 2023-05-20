import { Request, Response } from 'express';
import PlanoService from '../service/plano.service';

export default class PlanoController {
  public service = new PlanoService();

  public async listarPlanos(_req: Request, res: Response) {
    const lista = await this.service.listarPlanos();

    return res.status(200).json({ lista });
  }

  public async addPlano(req: Request, res: Response) {
    const { nome, periodo, preco } = req.body;
    const id = await this.service.addPlano({ nome, periodo, preco });

    return res.status(201).json({ id });
  }

  public async listaPlanosId(req: Request, res: Response) {
    const { id } = req.params;
    const nId = Number(id);
    const list = await this.service.listaPlanosId(nId);
    if (list) {
      return res.status(200).json(list);
    }

    return res.status(404).json({ message: 'Plano inexistente' });
  }

  public async deletePlano(req: Request, res: Response) {
    const { id } = req.params;
    const nId = Number(id);
    const message = await this.service.deletePlano(nId);
    if (message) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ message: 'Plano inexistente' });
  }
}