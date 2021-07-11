var fs = require('fs')
var jsonName = 'config/session.json'
if(!fs.existsSync(jsonName)){
    let sessionJson = {
        "tab" : {
            "session" : 0,
            "tab" : 0
        },
        "sessions":
            [
                /*
                {
                    "sessionID" : 0,                            // unique key
                    "name"  :"default",                         // name to left bar
                    "proto" :"",                                // main proto name
                    "importProto":[],                           // proto names
                    "type"  :0,                                 // 0 (Default session), 1 (rpc session)
                    "msg"   : [

                    ],
                    "tabs"   : [
                        {
                            "name" : "tab_name",                // name to top bar
                            "type" : 1,                         // 0 (in Default tab), 1 (sercice tab)
                            "closable" : true,                  // closable in top bar
                            "data" : {
                                "service" : "TestStream",
                                "requestStream" : false,
                                "responseStream" : false,
                                "requestMsg" : "TestRequest",
                                "input" : {imported_message: { imported_string: 1 }},
                                "inputs" : [
                                    {"key" : 1, "type" : "str", value : ""}
                                    {"key" : 2, "type" : "file", value : "./aaa/bbb"} // if file, value is path
                                ]
                                "output" : [],                  // output names (saved)

                            }
                        }
                    ]
                },
                */
                {
                    "sessionID" : 0,
                    "name"  :"default",
                    "type"  :0,
                    "tab"   : [
                        {
                            "id"   : 0,
                            "name" : "Welcome",
                            "type" : 0,
                            "closable" : false
                        },
                        {
                            "id"   : 1,
                            "name" : "Settings",
                            "type" : 1,
                            "closable" : false
                        }
                    ]
                }
            ]
    }
    let sessionStringify = JSON.stringify(sessionJson)
    fs.writeFileSync(jsonName,sessionStringify)
    console.log("File not exists : " + jsonName)
    exports.json = sessionJson
}else{
    let sessionStringify = fs.readFileSync(jsonName)
    let sessionJson = JSON.parse(sessionStringify.toString())
    console.log("File exists : " + jsonName)
    exports.json = sessionJson
}

