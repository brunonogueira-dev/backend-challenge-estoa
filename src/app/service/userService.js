const md5 = require('md5');
const { User } = require('../../database/models');

async function findAll () {
  const users = await User.findAll();

  return users
};


async function findOneById(id) {
  const user = await User.findOne({ where: { id } });

  return user;
}


async function create(object) {
  const newUser = await User.create({ ...object, password: md5(object.password)});
  
  return newUser;
}

async function update(id, name, email, password, typeUser) {
  await User.update({ name: name, email: email, password: md5(password), typeUser: typeUser }, { where: { id } });
}

async function deleteUser(id) {
  await User.destroy({ where: { id } })
}


module.exports = {
  findAll,
  findOneById,
  create,
  update,
  deleteUser,
};