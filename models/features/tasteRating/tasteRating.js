const Errors = require('../../errors/errors')
const TasteRating = {}
const Utils = require('../../util/util')

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

        //Get Animelist
        userName = req.body.userName
        fields = "list_status,mean,num_scoring_users"
        result = await Utils.getAnimeList(axios, accessToken, fields, userName)
        if (result.error != null) {
            //Animelist GET for the user failed
            res.status(502)
            res.send(result.error)
            return
        }

        let differenceRangeCounts = initDifferenceRangeCounts()

        //Remove Scores out of range
        filteredAnimeList = Utils.removeScoreOutofRange(result.animeList, req.body.upper, req.body.lower)
        
        //Remove plan_to_watch, only want anime from user that have actually been watched
        filteredAnimeList = Utils.removeStatus(filteredAnimeList, "plan_to_watch")

        

        let scoringUsersLogSum = 0
        let inaccuracy = 0
        for (let animeId in filteredAnimeList) {
            listEntry = filteredAnimeList[animeId]

            //Multiplier
            logFactor = Math.log10(listEntry.num_scoring_users)

            //Add to denominator
            scoringUsersLogSum += logFactor

            //Calculate absolute difference between user score and average
            difference = Math.abs(listEntry.mean - listEntry.list_status.score)

            //Increment difference ranges
            incrementDifferenceRangeCounts(differenceRangeCounts, difference)

            //Add to total
            inaccuracy += (difference) * logFactor
        }

        inaccuracy = (inaccuracy / scoringUsersLogSum).toFixed(3)

        console.log("inaccuracy is: ", inaccuracy)
        //console.log("taste rating is: ", 1-inaccuracy)

        console.log(differenceRangeCounts)



    }
}

function initDifferenceRangeCounts() {
    let differenceRangeCounts = {}
    differenceRangeCounts.s = 0
    differenceRangeCounts.a = 0
    differenceRangeCounts.b = 0
    differenceRangeCounts.c = 0
    differenceRangeCounts.d = 0
    differenceRangeCounts.e = 0
    differenceRangeCounts.f = 0
    return differenceRangeCounts
}

function incrementDifferenceRangeCounts(differenceRangeCounts, difference) {
    if (difference <= 0.5) {
        differenceRangeCounts.s ++
    } else if (difference <= 1) {
        differenceRangeCounts.a ++
    } else if (difference <= 2) {
        differenceRangeCounts.b ++
    } else if (difference <= 3.5) {
        differenceRangeCounts.c ++
    } else if (difference <= 5) {
        differenceRangeCounts.d ++
    } else if (difference <= 7.5) {
        differenceRangeCounts.e ++
    } else if (difference <= 10) {
        differenceRangeCounts.f ++
    }
}


//Export
module.exports = TasteRating;

