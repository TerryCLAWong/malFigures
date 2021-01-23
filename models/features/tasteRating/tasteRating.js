const Errors = require('../../errors/errors')
const TasteRating = {}

// Validates request body parameters for CommonStaff
const {body} = require('express-validator')

/*
Input:
userName - required - string

*/
TasteRating.validate = (method) => {
    if (method == "getTasteRating") {
        return [
            body("userName").custom((value, {req}) => {
                if (typeof value == "string") {
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
            })
        ]
    }
}

//Rating Calculation
const {validationResult} = require('express-validator')
TasteRating.getTasteRating = function(axios, accessToken) {
    return async (req, res) => {
        //Handle Errors post validation
        ok = Errors.checkValidationErrors(req, res, validationResult)
        if (ok == false) {return}

        console.log("hey hello world")
        //
    }
}


//Export
module.exports = TasteRating;

