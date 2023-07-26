const md5 = require('md5');
const UserService = require('../service/userService');

async function findAll(_, response) {
  try {
    const users = await UserService.findAll();

    return response.status(200).json(users);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findById(request, response) {
  try {
    const { id } = request.params;

    const user = await UserService.findOneById(id);

    if(!user) {
      return response.status(404).json({ error: 'Usuario não encontrado'});
    }

    return response.status(200).json(user);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function create(request, response) {
  try {
    const {
      body: { name, email, password },
    } = request;
    const object = {name, email, password }
    await UserService.create(object);
    return response.status(201).end();
  } catch (error) {
    return response.status(500).json({ message })
  }
}

async function update(request, response) {
  try {
    const { id } = request.params;

    const { name, email, password } = request.body;

    const updateUser = await UserService.update(id, name, email, password);

    return response.status(204).json({ updateUser });
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function deleteUser(request, response) {
  try {
    const { id } = request.params; 
    
    const user = await UserService.deleteUser(id);

    if(!user) {
      return response.status(400).json({ error: 'Usuario não encontrado' });
    }

    return response.json({ message: 'Usuario deletado com sucesso' });
  } catch({ message }) { 
    return response.status(500).json({ message });
  }
}


module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteUser
};