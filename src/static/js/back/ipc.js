// var sendGrpc = require('./send_grpc.js')
// console.log("sendGRPC")
// // sendGrpc(1.9)
// sendGrpc("A")


var importGrpc = require('./import_grpc.js')
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
            evt.reply('load_main_proto_diagram', 
                {
                    mainProto: filePaths,
                    grpcInform: returnGrpcInform
                }
            )
        }
    })
})  
ipcMain.on('save_session', (evt, payload) => {
    let saveSessionPayload = fsFunc.saveSession(payload)
    evt.reply('save_session', saveSessionPayload)
})  