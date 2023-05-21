import AssinaturaModel from '../database/models/assinatura.model';
import UsuarioModel from '../database/models/usuario.model';
import { IUsuario } from '../interfaces/IUsuario';
import { IUsuarioData } from '../interfaces/IUsuarioData';

/* eslint-disable class-methods-use-this */
export default class UsuarioService {
  public async listaUsuarios(): Promise<IUsuario[]> {
    const response: IUsuario[] = await UsuarioModel.findAll();
    return response;
  }

  public async addUsuario(data: IUsuarioData): Promise<number> {
    const { id } = await UsuarioModel.create({ ...data, tipo: 'Grátis' });
    const date = new Date();
    const dataDeExpiracao = new Date(date.setMonth(date.getMonth() + 1));
    await AssinaturaModel.create({ idPlano: 1, idUsuario: id, dataDeExpiracao });
    return id;
  }
}