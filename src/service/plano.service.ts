/* eslint-disable class-methods-use-this */
import PlanoModel from '../database/models/plano.model';
import { IPlano } from '../interfaces/IPlano';
import { IPlanoData } from '../interfaces/IPlanoData';

export default class PlanoService {
  public async listarPlanos(): Promise<IPlano[]> {
    const response: IPlano[] = await PlanoModel.findAll();
    response.forEach((r: IPlano) => {
      // eslint-disable-next-line no-param-reassign
      r.preco /= 100;
    });
        
    return response;
  }

  public async listaPlanosId(id: number): Promise<IPlano | null> {
    const response: IPlano | null = await PlanoModel.findByPk(id);
    if (response) {
      response.preco /= 100;
      return response;
    }

    return null;
  }

  public async addPlano(data: IPlanoData): Promise<number> {
    const { nome, periodo, preco } = data;
    const { id } = await PlanoModel.create({ nome, periodo, preco: preco * 100 });
    return id;
  }

  public async deletePlano(id: number): Promise<string | null> {
    const response = await PlanoModel.destroy({ where: { id } });
    if (response) {      
      const message = 'Deletado com sucesso';
      return message;
    }
    return null;
  }
}