import { Request, Response } from 'express';
import UsuarioService from '../service/usuario.service';

export default class UsuarioController {
  public service = new UsuarioService();

  public async addUsuario(req: Request, res: Response) {
    const { nome, senha } = req.body;
    const id = await this.service.addUsuario({ nome, senha });

    return res.status(201).json({ id });
  }

  public async listaUsuarios(_req: Request, res: Response) {
    const lista = await this.service.listaUsuarios();

    return res.status(200).json({ lista });
  }
}