const planApi = async(api, cors, express, planModel) => {

    //header postman
    api.use(express.json());
    api.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        response.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        api.use(cors());
        next();
    });

    //delete plan
    api.post('/plan-delete', async(request, reponse) => {
        const deletePlan = await planModel.destroy({ where: { UserID: request.query.id } })
        return response.json({ return: "Plano deletado com sucesso!" });
    });

    //finder plan
    api.get('/plan-search', async(request, response) => {
        const PlanID = await planModel.findByPk(request.query.id);
        return response.json({ PlanID });
    });

    //all plans
    api.get('/plan', async(request, response) => {
        await planModel.findAll()
            .then((data) => {
                return response.json({
                    return: data
                });
            }).catch((error) => {
                return response.status(400).json({
                    error: true,
                    return: "Erro: " + error
                });
            });
    });

    //adicionar plan
    api.post('/plan-add', async(request, response) => {
        planModel.create(request.body)
            .then(() => {
                return response.json({
                    return: "Plano cadastrado com sucesso!"
                });
            }).catch((error) => {
                return response.status(400).json({
                    error: true,
                    return: "Erro: " + error
                });
            })
    });

    //update plan
    api.post('/plan-update', async(request, response) => {
        planModel.update({
                PlanName: request.query.name,
                PlanPrice: request.query.price,
                PlanPeriod: request.query.period
            }, {
                where: { PlanID: request.query.id }
            })
            .then(() => {
                return response.json({
                    return: "Plano atualizado com sucesso!"
                });
            }).catch((error) => {
                return response.status(400).json({
                    error: true,
                    return: "Erro: " + error
                });
            })
    })
}

module.exports = planApi