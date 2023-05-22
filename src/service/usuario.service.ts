/* eslint-disable max-lines-per-function */

import AssinaturaModel from '../database/models/assinatura.model';
import PlanoModel from '../database/models/plano.model';
import UsuarioModel from '../database/models/usuario.model';
import { IAssinatura } from '../interfaces/IAssinatura';
import { IPlano } from '../interfaces/IPlano';
import { IUsuario } from '../interfaces/IUsuario';
import { IUsuarioData } from '../interfaces/IUsuarioData';
import fixData from '../utils/fix.data';
import getTimes from '../utils/get.times';

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

  public async listaUsuarioNome(nome: string): Promise<IUsuario[]> {
    const lista: IUsuario[] = await this.listaUsuarios();
    const response = lista.filter((item) => item.nome === nome);

    return response;
  }

  public async listaUsuarioData(date: string): Promise<IUsuario[]> {
    const lista: IUsuario[] = await this.listaUsuarios();
    const fixed = fixData(date);
    const fixedDate = JSON.stringify(getTimes(new Date(fixed)));

    const response: IUsuario[] = lista.filter((item) => {
      if (JSON.stringify(getTimes(item.createdAt)) == fixedDate) {
        return item;
      }
    });

    return response;
  }

  public async addUsuario(data: IUsuarioData): Promise<number> {
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
    const plano: IPlano | null = await PlanoModel.findOne({ where: { nome: data.tipo } });
    
    if (plano) {
      await this.atualizaAssinatura(plano, id);
    }
    if (response[0] !== 0) {      
      const message = 'Atualizado com sucesso';
      return message;
    }
    return null;
  }

  public async atualizaAssinatura(plano: IPlano, id: number) {
    const assinatura: IAssinatura | null = await AssinaturaModel
      .findOne({ where: { idUsuario: id } });
    
    if (assinatura) {
      await AssinaturaModel.update(
        { idPlano: plano.id,
          dataDeExpiracao: new Date(assinatura.dataDeExpiracao
            .setMonth(assinatura.dataDeExpiracao.getMonth() + plano.periodo)) }, 
        { where: { idUsuario: id } },
      );
    }
  }
}