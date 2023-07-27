const { Plan } = require('../../database/models');

async function findAll () {
  const plans = await Plan.findAll();

  return plans;
};

async function findById (id) {
  const plan = await Plan.findOne({ where: { id } });

  return plan;
};

async function create (object) {
  const newPlan = await Plan.create({ ...object });

  return newPlan;
}

async function update (id, name, price, expiryPeriod ) {
  await Plan.update({ name: name, price: price,  expiryPeriod: expiryPeriod }, { where: { id } });
};

async function deletePlan (id) {
  await Plan.destroy( { where: { id } } )
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deletePlan
};