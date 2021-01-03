const express = require ('express');
const MalInfo = require('../models/malInfo');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();


accessToken = process.env.ACCESS_TOKEN
router.get('/commonStaff',
    MalInfo.commonStaff.validate('getCommonStaff'),
    MalInfo.commonStaff.getCommonStaff(axios, accessToken)
)


//not used maybe delete
router.post('/todos', (req, res, next) => {

})

//not used maybe delete
router.delete('/todos/:id', (req, res, next) => {

})



module.exports = router;