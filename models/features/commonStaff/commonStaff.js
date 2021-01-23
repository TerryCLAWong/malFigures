const Errors = require('../../errors/errors')
const CommonStaff = {}
const Utils = require('../../util/util')


/*
Validates request body parameters for CommonStaff
*/
const {body} = require('express-validator')
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
            body("commonCount").custom((value, { req }) => {
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


const {validationResult} = require('express-validator')
CommonStaff.getCommonEmployees = function(axios, accessToken) {
    return async (req, res) => {
        //Handle Errors post validation
        ok = Errors.checkValidationErrors(req, res, validationResult)
        if (ok == false) {
            console.log("aaaaaa")
            return
        }

        //Get Animelist
        userName = req.body.userName
        fields = "list_status,studios"
        result = await Utils.getAnimeList(axios, accessToken, fields, userName) //await getAnimeList(req, axios, accessToken)
        
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
        console.log("Getting common anime studios")
        console.log(req.body)
        //Handle Errors post validation
        ok = Errors.checkValidationErrors(req, res, validationResult)
        if (ok == false) {return}
        //Get Animelist
        userName = req.body.userName
        fields = "list_status,studios"
        result = await Utils.getAnimeList(axios, accessToken, fields, userName) //await getAnimeList(req, axios, accessToken)
        if (result.error != null) {
            //Animelist GET for the user failed
            res.status(502)
            res.send(result.error)
            return
        }

        //Remove anime out of score range
        filteredAnimelist = removeScoreOutofRange(result.animeList, req.body.upper, req.body.lower)
        console.log("Score filtering complete")
        console.log("Animelist with score filtering: \n", filteredAnimelist, "\n")

        //Generating common studios
        studioCounts = getStudioCounts(filteredAnimelist, req.body.commonCount)
        console.log("Studio Counts:\n", studioCounts)

        //Send generated data back to client
        console.log("all good") //todo - remove
        res.status(200)
        res.send({
            "studios" : studioCounts
        })
        return
    } 
}

/*
Filters the animeList be removing objects that have a score outside of the [lower,upper] range
*/
function removeScoreOutofRange(animeList, upper, lower) {
    for (const animeId in animeList) {
        animeScore = animeList[animeId].list_status.score
        if (animeScore < lower || animeScore > upper) {
            delete animeList[animeId]
        }
    }
    return animeList
}

function getStudioCounts(animeList, commonAnimeCount) {
    studioCounts = {}
    studioList = []

    //Get matches
    for (const animeId in animeList) {
        //Iterate over studios
        for (const studio in animeList[animeId].studios) {
            studioName = animeList[animeId].studios[studio].name
            studioId = animeList[animeId].studios[studio].id
            if (studioCounts[studioName] == null) {
                studioEntry = {
                    count: 1,
                    id: studioId
                }
                studioCounts[studioName] = studioEntry
            } else {
                studioCounts[studioName].count++
            }
        }
    }

    //Remove counts less than commonAnimeCount
    for (const studio in studioCounts) {
        if (studioCounts[studio].count < commonAnimeCount) {
            delete studioCounts[studio]
        }
    }

    //Generate list of matches instead of map for data visualizer
    for (const studio in studioCounts) {
        studioEntry = {
            studio : studio,
            count: studioCounts[studio].count,
            id: studioCounts[studio].id
        }
        studioList.push(studioEntry)
    }
    
    //Sort from low to high count values
    studioList.sort(function(a,b) {
        return a.count - b.count
    })

    return studioList
}   

//Export
module.exports = CommonStaff;
