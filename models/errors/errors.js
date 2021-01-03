const Errors = {}

Errors.checkValidationErrors = function(req, res, validationResult) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        res.status(400)
        res.send({
            errors : errors.array()
        })
        return false
    }
    return true
}

//Export
module.exports = Errors;