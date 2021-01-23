const express = require ('express');
const MalInfo = require('../models/malInfo');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();


accessToken = process.env.ACCESS_TOKEN

/*
Common Staff
*/
router.get('/commonEmployees', //todo, finish this feature, change from GET to POST
    MalInfo.commonStaff.validate('getCommonEmployees'),
    MalInfo.commonStaff.getCommonEmployees(axios, accessToken)
)

router.post('/commonStudios',
    MalInfo.commonStaff.validate('getCommonStudios'),
    MalInfo.commonStaff.getCommonStudios(axios, accessToken)
)


/*
Taste Rating
*/
router.post('/tasteRating',
    MalInfo.tasteRating.validate('getTasteRating'),
    MalInfo.tasteRating.getTasteRating(axios, accessToken)
)


module.exports = router;