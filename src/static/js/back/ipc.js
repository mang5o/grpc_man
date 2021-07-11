// var sendGrpc = require('./send_grpc.js')
// console.log("sendGRPC")
// // sendGrpc(1.9)
// sendGrpc("A")

const { ipcMain } = require('electron')
var configs = {}
module.exports = function(expConfigs){
    configs = expConfigs
}
ipcMain.on('get_configs', (evt, payload) => {
    evt.reply('renderer_get_configs', configs)
})
ipcMain.on('get_layout_color', (evt, payload) => {
    let nowColorConf = configs.userData.user.nowColor
    let nowPalette = configs.nowColors.palette
    let nowReturnPalette = nowPalette.find(element => element["name"] == nowColorConf)
    evt.reply('layout_get_configs', nowReturnPalette)
})
ipcMain.on('get_user_data', (evt, payload) => {
    let nowUserData = configs.userData.user
    evt.reply('user_get', nowUserData)  
})
ipcMain.on('get_layout_session', (evt, payload) => {
    let nowSession = configs.nowSession
    evt.reply('layout_get_session', nowSession)  
})