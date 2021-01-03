
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
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            res.status(400)
            res.send({
                errors : errors.array()
            })
            return
        }

        //Get Animelist //TODO make this a function so that code does not have to be repeated
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
                //console.log(response.data)
                /*
                DATA = getStaffIntersection??
                */
                return {ok: true, data: "DATA"}
            }
        ).catch(
            (error) => {
                console.log("Failed GET animelist: " + req.body.userName)
                res.status(502)
                res.send({
                    error : "User not found: " + req.body.userName
                })
                return {ok: true, data: null}
            }
        )
        
        //On Successful 
        if (result.ok == true) {
            console.log("all good")
            res.send({
                "employeeList" : "TODO - object containing lots of stuff about employees"
            })
        }
    }
}

CommonStaff.getCommonStudios = function(axios, accessToken) {
    return async (req, res) => {
        console.log("testing")

        //TODO - make this error handling part modular
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
    }
}



//Export
module.exports = CommonStaff;
