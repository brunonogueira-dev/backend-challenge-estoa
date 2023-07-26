const PlanService = require('../service/planService');

async function findAll(_, response) {
  try {
    const plans = await PlanService.findAll();

    return response.status(200).json(plans)
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findById(request, response) {
  try {
    const { id } = request.params;

    const plan = await PlanService.findById(id);

    if(!plan) {
      return response.status(404).json({ error: 'Plano não encontrado' })
    }

    return response.status(200).json(plan);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function create(request, response) {
  try {
    const {
      body: { name, price, expiryPeriod },
    } = request;

    const object = { name, price, expiryPeriod }
    await PlanService.create(object);

    return response.status(201).end();
  } catch ({ message }) {
    return response.status(500).json({ message })
  }
}

async function update(request, response) {
  try {
    const { id } = request.params;

    const { name, price, expiryPeriod } = request.body;

    const updatePlan = await UserService.update(id, name, price, expiryPeriod);

    return response.status(204).json({ updatePlan });
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function deletePlan(request, response) {
  try {
    const { id } = request.params; 
    
    const plan = await PlanService.deletePlan(id);

    if(!plan) {
      return response.status(400).json({ error: 'Plano não encontrado' });
    }

    return response.json({ message: 'Plano deletado com sucesso' });
  } catch({ message }) { 
    return response.status(500).json({ message });
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deletePlan
};