var fs = require('fs')

if(!fs.existsSync('config/user.json')){
    let userJson = {
        "user": {
            session : [],
            nowColor: "Original"
        }
    }
    let userStringify = JSON.stringify(userJson)
    fs.writeFileSync('config/user.json',userStringify)
    console.log("File not exists : config/user.json")
    exports.json = userJson
}else{
    let userStringify = fs.readFileSync('config/user.json')
    let userJson = JSON.parse(userStringify.toString())
    console.log("File exists : config/user.json")
    exports.json = userJson
}