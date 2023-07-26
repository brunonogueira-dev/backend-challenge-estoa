const { Plans } = require('../../database/models');

async function findAll () {
  const plans = await Plans.findAll();

  return plans;
};

async function findById (id) {
  const plan = await Plans.findOne({ where: { id } });

  return plan;
};

async function create (object) {
  const newPlan = await Plans.create({ ...object });

  return newPlan;
}

async function update (id, name, price, expiryPeriod ) {
  await Plans.update({ name: name, price: price,  expiryPeriod: expiryPeriod }, { where: { id } });
};

async function deletePlan (id) {
  await Plans.destroy( { where: { id } } )
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deletePlan
};