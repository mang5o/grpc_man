// var sendGrpc = require('./send_grpc.js')
// console.log("sendGRPC")
// sendGrpc(1.9)

const { ipcMain } = require('electron')
var configs = {}
module.exports = function(expConfigs){
    configs = expConfigs
}
ipcMain.on('get_configs', (evt, payload) => {
    console.log("get_configs")
    console.log(payload)
    evt.reply('renderer_get_configs', configs)
})