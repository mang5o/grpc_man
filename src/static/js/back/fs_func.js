const fs = require('fs')
const paths = require('path')
//TODO : make automatic delimeter (/ or \\)

const fsFunc = {
    dirPath : "session_data",
    sessionName : "/session.json",
    protoConfigName : "/protoConfig.json",
    defaultSessionConfig: {
        nowKey : 0,
        nowSessions: [

        ]
    },
    defaultProtoConfig:{
        nowRPC: []
    },
    loadSession: function(){
        if (!fs.existsSync(this.dirPath)){
            fs.mkdirSync(this.dirPath)
        }
        if (!fs.existsSync(this.dirPath + this.sessionName)){
            fs.writeFileSync(this.dirPath + this.sessionName,
                JSON.stringify(this.defaultSessionConfig))
            return this.defaultSessionConfig
        }else{
            let nowSessionConfig = fs.readFileSync(this.dirPath + this.sessionName)
            let nowSessionJson = JSON.parse(nowSessionConfig.toString())
            return nowSessionJson
        }
    },
    saveSession: function(addElem){
        let nowSessionConfig = fs.readFileSync(this.dirPath + this.sessionName, 'utf-8')
        let nowSessionObject = JSON.parse(nowSessionConfig.toString())
        nowSessionObject.nowKey += 1

        while (fs.existsSync(this.dirPath + "/" + nowSessionObject.nowKey)){
            nowSessionObject.nowKey += 1
        }
        fs.mkdirSync(this.dirPath + "/" + nowSessionObject.nowKey)
        addElem["nowKey"] = nowSessionObject.nowKey
        fs.writeFileSync(this.dirPath + "/" + nowSessionObject.nowKey + this.protoConfigName,
            JSON.stringify(this.defaultProtoConfig))

        nowSessionObject.nowSessions.push(addElem)

        nowProtoPathList = addElem["protos"]
        for(let np = 0; np<nowProtoPathList.length; np++){
            let tmpProtoPath = nowProtoPathList[np]
            let tmpProtoName = nowProtoPathList[np].split("/").pop().split("\\").pop()
            if (tmpProtoName != "any.proto"){
                fs.copyFile(tmpProtoPath, this.dirPath + "/" + nowSessionObject.nowKey + "/" + tmpProtoName, (err) => {
                    if (err) throw err;
                  });
            }
            
        }
        let nowFinalIdx = nowSessionObject.nowSessions.length-1
        nowSessionObject.nowSessions[nowFinalIdx].protoPath = nowSessionObject.nowSessions[nowFinalIdx].protoPath.split("/").pop().split("\\").pop()
        for(let idxCnt = 0; idxCnt<nowSessionObject.nowSessions[nowFinalIdx].protos.length; idxCnt++){
            nowSessionObject.nowSessions[nowFinalIdx].protos[idxCnt] = nowSessionObject.nowSessions[nowFinalIdx].protos[idxCnt].split("/").pop().split("\\").pop()
        }
        fs.writeFileSync(this.dirPath + this.sessionName,
            JSON.stringify(nowSessionObject,null,4))
        
        return nowSessionObject
    }
    
}
module.exports = fsFunc