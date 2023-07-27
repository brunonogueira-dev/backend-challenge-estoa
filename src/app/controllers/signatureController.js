const SignatureService = require('../service/signaturesService');
const PlanService = require('../service/planService')
const UserService = require('../service/userService')

async function findAll(_, response) {
  try {
    const signatures = await SignatureService.findAll();

    return response.status(200).json(signatures);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findById(request, response) {
  try{

    const { id } = request.params;

    const signature = await SignatureService.findById(id);

    if(!signature) {
      return response.status(404).json({ error: 'Assinatura não encontrada' })
    }

    return response.status(200).json(signature)

  } catch({ message }) {
    return response.status(500).json({ message })
  }
}

async function create( request, response ) {

  try {

    const { planId, userId } = request.body;

    const plan = await PlanService.findById(planId);
    
    
    const today = new Date();
    const expiryDateMonths = plan.expiryPeriod;
    const expiry = new Date(today);
    expiry.setMonth(today.getMonth() + expiryDateMonths);
    const expiryDateFormat = `${expiry.getDate()}/${expiry.getMonth() + 1}/${expiry.getFullYear()}`;
    const newType = plan.name
    await UserService.updateTypeUser(userId, newType)

    const newSignature = await SignatureService.create(userId, planId, expiryDateFormat);

    return response.status(201).json(newSignature);

  } catch ({ message }) {

    return response.status(500).json({ message });

  }

}

async function deleteSignature( request, response ) {
  try {

    const { id } = request.params

    const signature = await SignatureService.findById(id);
    const userId = signature.userId

    await UserService.updateTypeUser(userId, 'Gratis')
    
    await SignatureService.deleteSignature(id);

    return response.json({ message: 'Assinatura Cancelada com sucesso' })

  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

module.exports = {
  findAll,
  create,
  findById,
  deleteSignature
};