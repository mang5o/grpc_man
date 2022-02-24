var refineProto = function(filePaths, grpcInform){
    let nowAddSession = {
        mainProto: filePaths[0],
        protos: grpcInform.files,
        protoStruct: {
            msg : [],
            serv : []
        },
    }
    let nowNamespacedMsg = []
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
            if (tmpElem.filename==null){//namespace
                nowNamespacedMsg.push([tmpElem.name, tmpElem.nested])
                continue
            }
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
                                type: "map<" 
                                + tmpElem.fields[keys].keyType 
                                + "," + tmpElem.fields[keys].type + ">"
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
    while(nowNamespacedMsg.length!=0){ // For imported Msg
        let tmpMsg = nowNamespacedMsg.splice(0,1)[0]
        for(let tmpMsgKey in tmpMsg[1]){
            if (tmpMsg[1][tmpMsgKey].fields!==undefined){
                let tmpPush = {
                    name: tmpMsg[0]+"."+tmpMsg[1][tmpMsgKey].name,
                    type: 1,
                    structs: []
                }
                for(let keys in tmpMsg[1][tmpMsgKey].fields){
                    if (tmpMsg[1][tmpMsgKey].fields[keys].map){
                        tmpPush.structs.push(
                            {
                                name: tmpMsg[1][tmpMsgKey].fields[keys].name,
                                type: "map<" 
                                + tmpMsg[1][tmpMsgKey].fields[keys].keyType 
                                + "," + tmpMsg[1][tmpMsgKey].fields[keys].type + ">"
                            }
                        )
                    }
                    else{
                        tmpPush.structs.push(
                            {
                                name: tmpMsg[1][tmpMsgKey].fields[keys].name,
                                type: tmpMsg[1][tmpMsgKey].fields[keys].type
                            }
                        )
                    }
                }
                nowAddSession.protoStruct.msg.push(tmpPush)
            }else{
                nowNamespacedMsg.push([tmpMsg[0]+"."+tmpMsg[1][tmpMsgKey].name, tmpMsg[1][tmpMsgKey].nested])
            }
        }
    }
    return nowAddSession
}

module.exports = refineProto