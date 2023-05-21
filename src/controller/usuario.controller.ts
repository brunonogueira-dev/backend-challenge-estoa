import { Request, Response } from 'express';
import UsuarioService from '../service/usuario.service';

export default class UsuarioController {
  public service = new UsuarioService();

  public noUser = 'Usuário inexistente';

  public async addUsuario(req: Request, res: Response) {
    const { nome, senha } = req.body;
    const id = await this.service.addUsuario({ nome, senha });

    return res.status(201).json({ id });
  }

  public async listaUsuarios(_req: Request, res: Response) {
    const lista = await this.service.listaUsuarios();

    return res.status(200).json({ lista });
  }

  public async listaUsuarioId(req: Request, res: Response) {
    const { id } = req.params;
    const nId = Number(id);
    const message = await this.service.listaUsuariosId(nId);
    
    if (message) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ message: this.noUser });
  }

  public async atualizaUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const nId = Number(id);
    const message = await this.service.atualizaUsuario(nId, data);
    if (message) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ message: this.noUser });
  }

  public async deleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const nId = Number(id);
    const message = await this.service.deleteUsuario(nId);
    if (message) {
      return res.status(204).json({ message });
    }

    return res.status(404).json({ message: this.noUser });
  }
}