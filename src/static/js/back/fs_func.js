const fs = require('fs')

const fsFunc = {
    dirPath : "session_data",
    sessionName : "/session.json",
    defaultSessionConfig: {
        nowKey : 0,
        nowSessions: [

        ]
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
        addElem["nowKey"] = nowSessionObject.nowKey
        nowSessionObject.nowSessions.push(addElem)
        fs.writeFileSync(this.dirPath + this.sessionName,
            JSON.stringify(nowSessionObject,null,4))
        return nowSessionObject
    }
    
}
module.exports = fsFunc