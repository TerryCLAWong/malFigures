//Importing features
const CommonStaff = require('./features/commonStaff/commonStaff')
const TasteRating = require('./features/tasteRating/tasteRating')

//Declare return object
const MalInfo = {}

//Add features to MalInfo
MalInfo.commonStaff = CommonStaff
MalInfo.tasteRating = TasteRating

//Export
module.exports = MalInfo;