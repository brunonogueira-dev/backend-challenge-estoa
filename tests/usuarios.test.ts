import AssinaturaModel from "../src/database/models/assinatura.model";
import UsuarioModel from "../src/database/models/usuario.model";
import UsuarioService from "../src/service/usuario.service";
import { lista, data, create, up } from "./mocks/mocks.usuarios";


describe('Funções de service', () => {
    const service = new UsuarioService();
    beforeEach(() => {
      jest.resetAllMocks(); 
    });
  
    it('Testa a função listaUsuarios', async () => {
      UsuarioModel.findAll = jest.fn().mockResolvedValue(lista);
      const response = await service.listaUsuarios();
      expect(response).toEqual(lista);
    });
  
    it('Testa a função listarUsuarioId', async () => {
      UsuarioModel.findByPk = jest.fn().mockResolvedValue(lista[0]);
      const response = await service.listaUsuariosId(1);
      expect(response).toEqual(lista[0]);
    });
  
    it('Testa a função listarUsuarioNome', async () => {
      UsuarioModel.findAll = jest.fn().mockResolvedValue(lista);
      const response = await service.listaUsuarioNome('Eduardo');
      expect(response).toEqual([lista[0]]);
    });
  
    it('Testa a função addUsuario', async () => {
      UsuarioModel.create = jest.fn().mockResolvedValue(create);
      AssinaturaModel.create = jest.fn().mockResolvedValue(1);
      const response = await service.addUsuario(data);
      expect(response).toEqual(1);
    });

    it('Testa a função deleteUsuario', async () => {
        UsuarioModel.destroy = jest.fn().mockResolvedValue(up);
        const response = await service.deleteUsuario(1);
        expect(response).toEqual('Deletado com sucesso');
      });
  
    it('Testa a função atualizaUsuario', async () => {
      UsuarioModel.update = jest.fn().mockResolvedValue(up);
      AssinaturaModel.create = jest.fn().mockResolvedValue(1);
      const response = await service.atualizaUsuario(1, data);
      expect(response).toEqual('Atualizado com sucesso'); 
    });
  });