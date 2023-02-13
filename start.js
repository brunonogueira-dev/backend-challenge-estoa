const express = require('express');
const cors = require('cors');
const api = express();

(async() => {
    const db = require('./src/data/sql');

    const userApi = require('./src/service/user-api');
    const planApi = require('./src/service/plan-api');
    const subApi = require('./src/service/sub-api');

    const userModel = require('./src/model/user');;;
    const planModel = require('./src/model/plan');
    const subModel = require('./src/model/sub');

    api.listen(3000, () => {
        console.log('API On-line! ✅')
    });

    await db.sync();

    userApi(api, cors, express, userModel);
    planApi(api, cors, express, planModel);
    subApi(api, cors, express, subModel);

})();