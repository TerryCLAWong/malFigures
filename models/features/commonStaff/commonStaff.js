const Errors = require('../../errors/errors')
const CommonStaff = {}


/*
Validates request body parameters for CommonStaff
*/
const {body} = require('express-validator/check')
CommonStaff.validate = (method) => {
    if (method == "getCommonEmployees" || method == "getCommonStudios") { //validation for both methods are the same
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


const {validationResult} = require('express-validator/check')
CommonStaff.getCommonEmployees = function(axios, accessToken) {
    return async (req, res) => {
        //Handle Errors post validation
        ok = Errors.checkValidationErrors(req, res, validationResult)
        if (ok == false) {
            console.log("aaaaaa")
            return
        }

        //Get Animelist
        result = await getAnimeList(req, axios, accessToken)
        
        //On Successful 
        if (result.error == null) {
            console.log("all good")
            res.status(200)
            res.send({
                "employeeList" : "TODO - object containing lots of stuff about employees"
            })
        }
    }
}

CommonStaff.getCommonStudios = function(axios, accessToken) {
    return async (req, res) => {
        //Handle Errors post validation
        ok = Errors.checkValidationErrors(req, res, validationResult)
        if (ok == false) {return}

        //Get Animelist
        result = await getAnimeList(req, axios, accessToken)

        if (result.error == null) {
            console.log("all good")
            res.status(200)
            res.send({
                "studioList" : "TODO - object containing lots of stuff about studios"
            })
        } else {
            res.status(502)
            res.send(result.error)
        }
    } 
}

async function getAnimeList(req, axios, accessToken) {
    authorization = "Bearer " + accessToken
    result = await axios({   
        method: "get",
        url: "https://api.myanimelist.net/v2/users/" + req.body.userName + "/animelist?",
        params: {
            "fields" : "list_status"
        },
        headers: {
            "Authorization" : authorization
        }
    }).then(
        (response) => {
            console.log("Sucessful GET animelist: " + req.body.userName)
            //TODO loop until animelist pages empty
            return {error: null, data: "DATA"}
        }
    ).catch(
        (error) => {
            console.log("Failed GET animelist: " + req.body.userName)
            MALAPIError = {"MAL API Error": error.response.data.error}
            return {error: MALAPIError, data: null}
        }
    )

    return result
}

//Export
module.exports = CommonStaff;
