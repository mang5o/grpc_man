var refineProto = function(filePaths, grpcInform){
    let nowAddSession = {
        mainProto: filePaths[0],
        protos: grpcInform.files,
        protoStruct: {
            msg : [],
            serv : []
        },
    }
    for(let nestedKey in grpcInform.nested){
        let tmpElem = grpcInform.nested[nestedKey]
        if (tmpElem.methods!==undefined){ // Service
            let tmpPush = {
                    name: tmpElem.name,
                    type: 0,
                    rpcs: []
            }
            for(let methodsKey in tmpElem.methods){
                tmpPush.rpcs.push(
                    {
                        name: methodsKey,
                        requestType: tmpElem.methods[methodsKey].requestType,
                        responseType: tmpElem.methods[methodsKey].responseType
                    }
                )
            }
            nowAddSession.protoStruct.serv.push(tmpPush)
        }
        else{ //massage
            let tmpPush = {
                    name: tmpElem.name,
                    type: 1,
                    structs: []
            }
            for(let keys in tmpElem.fields){
                    if (tmpElem.fields[keys].map){
                        tmpPush.structs.push(
                            {
                                name: tmpElem.fields[keys].name,
                                type: "map<>" 
                                + tmpElem.fields[keys].keyType 
                                + "<>" + tmpElem.fields[keys].type
                            }
                        )
                    }
                    else{
                        tmpPush.structs.push(
                            {
                                name: tmpElem.fields[keys].name,
                                type: tmpElem.fields[keys].type
                            }
                        )
                    }
                }
            nowAddSession.protoStruct.msg.push(tmpPush)
        }
    }
    return nowAddSession
}

module.exports = refineProto