import PlanoModel from '../database/models/plano.model';
import { IPlano } from '../interfaces/IPlano';

export default class PlanoService {
  // eslint-disable-next-line class-methods-use-this
  public async listarPlanos(): Promise<IPlano[]> {
    const response = await PlanoModel.findAll();
    console.log(response);
        
    return response;
  }
}