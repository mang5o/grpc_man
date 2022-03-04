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
                let requestStreamPar = (tmpElem.methods[methodsKey].requestStream!==undefined)
                let responseStreamPar = (tmpElem.methods[methodsKey].responseStream!==undefined)
                tmpPush.rpcs.push(
                    {
                        name: methodsKey,
                        requestType: tmpElem.methods[methodsKey].requestType,
                        responseType: tmpElem.methods[methodsKey].responseType,
                        requestStream: requestStreamPar,
                        responseStream: responseStreamPar
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
            if (tmpElem.nested !== undefined){
                nowNamespacedMsg.push([tmpElem.name,tmpElem.nested])
            }
            let tmpPush = {
                    name: tmpElem.name,
                    enum: false,
                    structs: [],
                    oneof: (tmpElem.oneofs !== undefined)
            }
            for(let keys in tmpElem.fields){
                let nowRepeat = false
                if(tmpElem.fields[keys].rule == "repeated"){
                    nowRepeat = true
                }
                    if (tmpElem.fields[keys].map){
                        tmpPush.structs.push(
                            {
                                name: tmpElem.fields[keys].name,
                                type: "map<" 
                                + tmpElem.fields[keys].keyType 
                                + "," + tmpElem.fields[keys].type + ">",
                                repeat : nowRepeat
                            }
                        )
                    }
                    else{
                        tmpPush.structs.push(
                            {
                                name: tmpElem.fields[keys].name,
                                type: tmpElem.fields[keys].type,
                                repeat : nowRepeat
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
                    enum: false,
                    structs: [],
                    oneof: (tmpMsg[1][tmpMsgKey].oneofs !== undefined)
                }
                for(let keys in tmpMsg[1][tmpMsgKey].fields){
                    let nowRepeat = false
                    if(tmpMsg[1][tmpMsgKey].fields[keys].rule == "repeated"){
                        nowRepeat = true
                    }
                    if (tmpMsg[1][tmpMsgKey].fields[keys].map){
                        tmpPush.structs.push(
                            {
                                name: tmpMsg[1][tmpMsgKey].fields[keys].name,
                                type: "map<" 
                                + tmpMsg[1][tmpMsgKey].fields[keys].keyType 
                                + "," + tmpMsg[1][tmpMsgKey].fields[keys].type + ">",
                                repeat : nowRepeat,
                                oneof: (tmpMsg[1][tmpMsgKey].fields[keys].oneofs !== undefined)
                            }
                        )
                    }
                    else{
                        tmpPush.structs.push(
                            {
                                name: tmpMsg[1][tmpMsgKey].fields[keys].name,
                                type: tmpMsg[1][tmpMsgKey].fields[keys].type,
                                repeat : nowRepeat,
                                oneof: ( tmpMsg[1][tmpMsgKey].fields[keys].oneofs !== undefined)
                            }
                        )
                    }
                }
                nowAddSession.protoStruct.msg.push(tmpPush)
            }
            else{
                nowNamespacedMsg.push([tmpMsg[0]+"."+tmpMsg[1][tmpMsgKey].name, tmpMsg[1][tmpMsgKey].nested])
            }
            if (tmpMsg[1][tmpMsgKey].nested !== undefined){
                nowNamespacedMsg.push([tmpMsg[0]+"."+tmpMsg[1][tmpMsgKey].name,tmpMsg[1][tmpMsgKey].nested])
            }
            if (tmpMsg[1][tmpMsgKey].valuesById !== undefined){
                let tmpPush = {
                    name: tmpMsg[1][tmpMsgKey].name,
                    enum: true,
                    structs: [],
                    oneof: (tmpMsg[1][tmpMsgKey].oneofs !== undefined)
                }
                let nowValues = tmpMsg[1][tmpMsgKey].valuesById
                let nowRepeat = false
                try{
                    if(tmpMsg[1][tmpMsgKey].fields[keys].rule == "repeated"){
                        nowRepeat = true
                    }
                }catch(e){
                    // TODO : Enum repeat case
                }
                for(let nowValueKey in nowValues){
                    tmpPush.structs.push({
                        name: nowValues[nowValueKey],
                        type: "enum<" + nowValueKey + ">",
                        repeat : nowRepeat,
                        oneof: false
                    })
                }
                nowAddSession.protoStruct.msg.push(tmpPush)
            }
        }
    }
    
    return nowAddSession
}

module.exports = refineProto