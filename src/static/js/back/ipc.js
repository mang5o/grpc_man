// var sendGrpc = require('./send_grpc.js')
// console.log("sendGRPC")
// // sendGrpc(1.9)
// sendGrpc("A")


var importGrpc = require('./grpc/import_grpc')
var refineProto = require("./grpc/refine_proto")
var fsFunc = require('./fs_func')
const { ipcMain, dialog } = require('electron')
ipcMain.on('load_main_proto_diagram', (evt, payload) => {
    dialog.showOpenDialog(null, { 
        title: "Select Main Proto File",
        properties: ['openFile'],
        filters: [
            { name: '.Proto', extensions: ['proto']}
        ]
    }).then(filePaths=>{
        if (filePaths.filePaths.length>0){
            let returnGrpcInform = importGrpc(filePaths)
            evt.reply('load_main_proto_diagram', refineProto(filePaths.filePaths, returnGrpcInform))
        }
    })
})  
ipcMain.on('save_session', (evt, payload) => {
    let saveSessionPayload = fsFunc.saveSession(payload)
    evt.reply('save_session', saveSessionPayload)
})  
ipcMain.on('reload_session', (evt, payload) => {
    let reloadSessionPayload = fsFunc.loadSession()
    evt.reply('reload_session', reloadSessionPayload)
})  
ipcMain.on('save_session_left', (evt, payload) => {
    let reloadSessionPayload = fsFunc.saveConfig(payload)
})  
