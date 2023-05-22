/* eslint-disable mocha/no-mocha-arrows */

import PlanoModel from "../src/database/models/plano.model";
import PlanoService from "../src/service/plano.service";
import { lista, real, create, del, up, planoData } from "./mocks/mocks.planos";


describe('Funções de service', () => {
  const service = new PlanoService();
  beforeEach(() => {
    jest.resetAllMocks(); 
  });

  it('Testa a função listarPlanos', async () => {
    PlanoModel.findAll = jest.fn().mockResolvedValue(lista);
    const response = await service.listarPlanos();
    expect(response).toEqual(real);
  });

  it('Testa a função listarPlanosId', async () => {
    PlanoModel.findByPk = jest.fn().mockResolvedValue(lista[0]);
    const response = await service.listaPlanosId(1);
    expect(response).toEqual(real[0]);
  });

  it('Testa a função addPlano', async () => {
    PlanoModel.create = jest.fn().mockResolvedValue(create);
    const response = await service.addPlano(planoData);
    expect(response).toEqual(1);
  });

  it('Testa a função deletePlano', async () => {
    PlanoModel.destroy = jest.fn().mockResolvedValue(del);
    const response = await service.deletePlano(1);
    expect(response).toEqual('Deletado com sucesso');
  });

  it('Testa a função atualizaPlano', async () => {
    PlanoModel.update = jest.fn().mockResolvedValue(up);
    const response = await service.atualizaPlano(1, planoData);
    expect(response).toEqual('Atualizado com sucesso'); 
  });
});