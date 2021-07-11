require('./dir.js')
let nowColorJson = require('./color.js')
let nowUserJson  = require('./user.js')
let nowSessionJson  = require('./session.js')
exports.nowColors = nowColorJson.json
exports.userData  = nowUserJson.json
exports.nowSession = nowSessionJson.json