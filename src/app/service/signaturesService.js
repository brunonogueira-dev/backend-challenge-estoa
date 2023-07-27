const { Signatures } = require('../../database/models');

async function findAll () {
  const plans = await Signatures.findAll();

  return plans;
};

async function findById (id) {
  const plan = await Signatures.findOne({ where: { id } });

  return plan;
};

async function create (userId, planId, expiryDate) {
  const newSignature = await Signatures.create({ userId: userId, planId: planId,  expiryDate: expiryDate });

  return newSignature;
}

async function deleteSignature (id) {
  await Signatures.destroy( { where: { id } } )
};

module.exports = {
  findAll,
  findById,
  create,
  deleteSignature
};