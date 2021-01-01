const express = require ('express');
const router = express.Router();
const MalInfo = require('../models/malInfo');


router.get('/commonStaff',
    MalInfo.commonStaff.validate('getCommonStaff'),
    MalInfo.commonStaff.getCommonStaff
)


//not used maybe delete
router.post('/todos', (req, res, next) => {

})

//not used maybe delete
router.delete('/todos/:id', (req, res, next) => {

})



module.exports = router;