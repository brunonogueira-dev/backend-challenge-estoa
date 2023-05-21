import AssinaturaModel from '../database/models/assinatura.model';
import PlanoModel from '../database/models/plano.model';
import UsuarioModel from '../database/models/usuario.model';
import { IPlano } from '../interfaces/IPlano';
import { IUsuario } from '../interfaces/IUsuario';
import { IUsuarioData } from '../interfaces/IUsuarioData';

/* eslint-disable class-methods-use-this */
export default class UsuarioService {
  public async listaUsuarios(): Promise<IUsuario[]> {
    const response: IUsuario[] = await UsuarioModel.findAll();
    return response;
  }

  public async listaUsuariosId(id: number): Promise<IUsuario | null> {
    const response: IUsuario | null = await UsuarioModel.findByPk(id);
    
    if (response) {
      return response;
    }

    return null;
  }

  public async addUsuario(data: IUsuarioData): Promise<number> {
    // const { id } = await UsuarioModel.create({ ...data, tipo: 'Grátis' });
    // const date = new Date();
    // const dataDeExpiracao = new Date(date.setMonth(date.getMonth() + 1));
    // await AssinaturaModel.create({ idPlano: 1, idUsuario: id, dataDeExpiracao });
    // return id;
    const { id } = await UsuarioModel.create({ ...data, tipo: 'Grátis' });
    const response: IPlano | null = await PlanoModel.findOne({ where: { nome: 'Grátis' } });
    if (response) {
      const date = new Date();
      const dataDeExpiracao = new Date(date.setMonth(date.getMonth() + response.periodo));
      await AssinaturaModel.create({ idPlano: response.id, idUsuario: id, dataDeExpiracao });
    }
    return id;
  }

  public async deleteUsuario(id: number) {
    const response = await UsuarioModel.destroy({ where: { id } });
    if (response) {      
      const message = 'Deletado com sucesso';
      return message;
    }
    return null;
  }

  public async atualizaUsuario(id: number, data: IUsuarioData): Promise<string | null> {
    const response = await UsuarioModel.update({ ...data }, { where: { id } });
    console.log(data);
    
    if (response) {      
      const message = 'Atualizado com sucesso';
      return message;
    }
    return null;
  }
}