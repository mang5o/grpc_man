var fs = require('fs')
var jsonName = 'config/user.json'
if(!fs.existsSync(jsonName)){
    let userJson = {
        "user": {
            userName : "",
            metaData : [],
            timeOut : 1.0, //Second
            nowColor: "Original",
            packageDefinition : {
                                    keepCase: true,
                                    longs: String,
                                    enums: String,
                                    defaults: true,
                                    oneofs: true
                                }
        }
    }
    let userStringify = JSON.stringify(userJson)
    fs.writeFileSync(jsonName,userStringify)
    console.log("File not exists : " + jsonName)
    exports.json = userJson
}else{
    let userStringify = fs.readFileSync(jsonName)
    let userJson = JSON.parse(userStringify.toString())
    console.log("File exists : " + jsonName)
    exports.json = userJson
}