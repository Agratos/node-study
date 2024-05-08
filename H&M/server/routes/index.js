const expores = require('express');
const router = expores.Router();

const userApi = require('./user.api');

router.use('/user', userApi);
