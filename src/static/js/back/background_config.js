var configs = require("../../../components/default_config/data.js")
console.log("config : " + JSON.stringify(configs))

require('./ipc.js')(configs)