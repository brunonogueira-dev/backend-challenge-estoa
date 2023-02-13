const userApi = async(api, cors, express, userModel) => {

    //header postman
    api.use(express.json());
    api.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        response.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        api.use(cors());
        next();
    });

    //delete user
    api.post('/user-delete', async(request, reponse) => {
        const deleteUser = await userModel.destroy({ where: { UserID: request.query.id } })
        return response.json({ return: "Usúario deletado com sucesso!" });
    });

    //finder user
    api.get('/user-search', async(request, response) => {
        const userID = await userModel.findByPk(request.query.id);
        return response.json({ userID });
    });

    //all users
    api.get('/users', async(request, response) => {
        await userModel.findAll()
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

    //adicionar user
    api.post('/user-add', async(request, response) => {
        userModel.create(request.body)
            .then(() => {
                return response.json({
                    return: "Usúario cadastrado com sucesso!"
                });
            }).catch((error) => {
                return response.status(400).json({
                    error: true,
                    return: "Erro: " + error
                });
            })
    });

    //update user
    api.post('/user-update', async(request, response) => {
        userModel.update({
                UserName: request.query.name,
                UserEmail: request.query.email,
                UserType: request.query.type
            }, {
                where: { UserID: request.query.id }
            })
            .then(() => {
                return response.json({
                    return: "Usúario atualizado com sucesso!"
                });
            }).catch((error) => {
                return response.status(400).json({
                    error: true,
                    return: "Erro: " + error
                });
            })
    })

}

module.exports = userApi