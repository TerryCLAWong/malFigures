
const CommonStaff = {}

const {body} = require('express-validator/check')
/*
Validates request body parameters for getCommonStaff
*/
CommonStaff.validate = (method) => {
    switch (method) {
        case "getCommonStaff": {
            return [
                body("userName").custom((value, {req}) => {
                    if (typeof value == "string") {
                        //TODO, CHECK IF THE USER EXISTS
                        return true
                    }
                    throw new Error("Value must be a string") 
                }),
                body(["lower", "upper"]).custom((value, {req}) => {
                    if (value == undefined) {
                        throw new Error("Value is required") 
                    } else if (Number.isInteger(value)) {
                        if (value >= 0 && value <= 10) {
                            return true
                        }
                        throw new Error("Value must be in [1,10]")  
                    }
                    throw new Error("Value must be an integer") 
                }),
                body("commonAnimeCount").custom((value, { req }) => {
                    if (value == undefined) {
                        throw new Error("Value is required")  
                    } else if (Number.isInteger(value)) {
                        if (value > 0) {
                            return true
                        }
                        throw new Error("Value must be strictly positive")  
                    }
                    throw new Error("Value must be an integer") 
                })
            ]
        }
    }
}


const {validationResult} = require('express-validator/check')
CommonStaff.getCommonStaff = (req, res) => {
    //Handle Errors post validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        res.status(400)
        res.send({
            errors : errors.array()
        })
        return
    }

    //TODO do api stuff etc etc and make a response

    console.log("all good")
    res.send({
        "message" : "all gooch"
    })
}
/*
function getCommonStaff(username, upper, lower, commonAnimeCount) {
    console.log(username, upper, lower, commonAnimeCount)
}
*/


//Export
module.exports = CommonStaff;
