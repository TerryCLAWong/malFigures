const express = require ('express');
const MalInfo = require('../models/malInfo');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();


accessToken = process.env.ACCESS_TOKEN

/*
Common Staff
*/
router.get('/commonEmployees',
    MalInfo.commonStaff.validate('getCommonEmployees'),
    MalInfo.commonStaff.getCommonEmployees(axios, accessToken)
)


//not used maybe delete
router.post('/todos', (req, res, next) => {

})

//not used maybe delete
router.delete('/todos/:id', (req, res, next) => {

})



module.exports = router;