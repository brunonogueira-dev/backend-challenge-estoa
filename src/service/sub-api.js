const subApi = async(api, cors, express, subModel) => {

    //header postman
    api.use(express.json());
    api.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        response.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        api.use(cors());
        next();
    });

    //all subs
    api.get('/sub', async(request, response) => {
        await subModel.findAll()
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
}

module.exports = subApi