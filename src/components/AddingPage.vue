<template>
    <div class="addingDiv">
        <table class="addingTable">
            <tr class="topTr">
                <td class="topLeft">
                    <label for="protoPath">Proto</label>
                </td>
                <td class="topCenter">
                    <input class="protoPath" type="text" id="protoPath" name="protoPath" v-model="protoPath" readonly>
                </td>
                <td class="topRight">
                    <button class="mainProtoBtn"
                            type="button" v-on:click="loadDialog">
                        Load proto
                    </button>
                </td>
            </tr>
            <tr v-if="nowFlag==2" class="secondTr">
                <td class="sessionName" colspan="3">
                    <p class="sessionP" align="left">Session name</p>
                    <input class="sessionNameInput" type="text" id="sessionNameInput" name="sessionNameInput" v-model="sessionName">
                </td>
            </tr>
            <tr v-if="nowFlag==2" class="thirdTr">
                <td class="previewDiv" colspan="3">
                    <p>Preview</p>
                    <div v-for="(i, index) in allPaths" v-bind:key="index" class="nestedDiv">
                        <div class="importDiv">IMPORT</div>
                        <p class="nestedP">{{i}}</p>
                    </div>
                    <div v-for="(i, index) in nested" v-bind:key="index" class="nestedDiv">
                        <div v-if="i[1].methods!==undefined" class="serviceDiv">SERVICE</div>
                        <div v-else class="messageDiv">MESSAGE</div>
                        <p class="nestedP">{{i[0]}}</p>
                        <template v-if="i[1].methods!==undefined">
                            <div v-for="(j,subIndex) in i[1].methods" v-bind:key="subIndex" class="smallNestedDiv">
                                <div class="rpcDiv">RPC</div>
                                <p class="subNestedP">{{j[0]}}</p>
                            </div>
                        </template>
                    </div>
                </td>
            </tr>
            <tr v-if="nowFlag==2">
                <td colspan="3" class="saveTr"> 
                    <button class="saveProtoBtn"
                            type="button" v-on:click="addSession">
                        Save Session
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
var addingPageData = {
          nowFlag:0, // 0: not uploaded, 1 : not available proto, 2 : good proto
          protoPath: "test",
          allPaths: [],
          nested: [],
          sessionName: "session name"
}
const electron = window.require("electron")
export default {
  name: 'AddingPage',
  data: function() {
      return addingPageData
  },
  methods:{
    loadDialog: function(){
            electron.ipcRenderer.send('load_main_proto_diagram', '')
    },
    setData: function(key, val){
            this[key] = val
    },
    addNested: function(dict){
        this['nested'] = []
        for (let key in dict){
            if (dict[key].methods !== undefined){
                let tmpDict = dict[key].methods
                let newMethods = []
                for (let subkey in tmpDict){
                    newMethods.push([subkey, tmpDict[subkey]])
                }
                dict[key].methods = newMethods
            }
            this['nested'].push([key, dict[key]])
        }
    },
    addSession: function(){
        if (addingPageData.nowFlag!=2){
            return
        }
        let nowAddSession = {
            mainProto: addingPageData.protoPath,
            protos: addingPageData.allPaths,
            protoStruct: {
                msg : [],
                serv : []
            },
        }
        for(let cnt=0; cnt<addingPageData.nested.length; cnt++){
            let tmpElem = addingPageData.nested[cnt]
            if (tmpElem[1].methods!==undefined){ // Service
                let tmpPush = {
                        name: tmpElem[0],
                        type: 0,
                        rpcs: []
                }
                for(let cntt = 0; cntt<tmpElem[1].methods.length; cntt++){
                    tmpPush.rpcs.push(
                        {
                            name: tmpElem[1].methods[cntt][0],
                            requestType: tmpElem[1].methods[cntt][1].requestType,
                            responseType: tmpElem[1].methods[cntt][1].responseType
                        }
                    )
                }
                nowAddSession.protoStruct.serv.push(tmpPush)
            }
            else{ //massage
                let tmpPush = {
                        name: tmpElem[0],
                        type: 1,
                        structs: []
                }
                for(let keys in tmpElem[1].fields){
                        if (tmpElem[1].fields[keys].map){
                            tmpPush.structs.push(
                                {
                                    name: tmpElem[1].fields[keys].name,
                                    type: "map<>" 
                                    + tmpElem[1].fields[keys].keyType 
                                    + "<>" + tmpElem[1].fields[keys].type
                                }
                            )
                        }
                        else{
                            tmpPush.structs.push(
                                {
                                    name: tmpElem[1].fields[keys].name,
                                    type: tmpElem[1].fields[keys].type
                                }
                            )
                        }
                    }
                // structs Type 넣기
                nowAddSession.protoStruct.msg.push(tmpPush)
            }
        }
        electron.ipcRenderer.send('save_session', nowAddSession)
    }
  },
  created(){
        electron.ipcRenderer.on('load_main_proto_diagram', (evt, payload) => {
            console.log(payload)
            this.setData("nowFlag",2)
            this.setData("protoPath", payload.mainProto.filePaths[0])
            this.setData("allPaths", payload.grpcInform.files)
            this.addNested(payload.grpcInform.nested)
            console.log(addingPageData)
        }) 
        electron.ipcRenderer.on('save_session', (evt, payload) => {
            console.log(payload)
        }) 
    }
}

</script>

<style scoped>
.addingDiv{
    width: 100%;
    height: 100%;
}
.addingTable {
  width: 100%;
  height: 100%;
  padding: 8px;
}
.topTr{
    width: 100%;
    height: 32px;
}
.secondTr{
    height: 32px;
}
.thirdTr{
    width: 100%;
    height: 64px;
    overflow-y: auto;
}
.topLeft{
    width: 64px;
}
.topCenter{
    position: inherit;
}
.topRight{
    width: 100px;
}
.protoPath{
    width: 100%;
}
.sessionName{
    margin: 8px;
    height: 32px;
}
.sessionNameInput{
    position: inherit;
}
.sessionP{
    padding: 0;
    margin: 0;
}
.nestedDiv{
    text-align:left;
}
.serviceDiv{
    display: inline-block;
    background-color: #000000;
    margin: 4px;
    padding: 4px;
    width: 96px;
    text-align: center;
}
.messageDiv{
    display: inline-block;
    background-color: #000000;
    margin: 4px;
    padding: 4px;
    width: 96px;
    text-align: center;
}
.importDiv{
    display: inline-block;
    background-color: #000000;
    margin: 4px;
    padding: 4px;
    width: 96px;
    text-align: center;
    vertical-align: top;
}
.rpcDiv{
    display: inline-block;
    background-color: #000000;
    margin: 2px 8px 2px 28px;
    padding: 2px;
    width: 96px;
    text-align: center;
    vertical-align: top;
}
.nestedP{
    display: inline-block;
    padding: 8px;
    margin: 0
}
.subNestedP{
    display: inline-block;
    padding: 0;
    margin: 0
}
.previewDiv{
    overflow-x:hidden;
    overflow-y:auto;
}
.saveProtoBtn{
    display: inline-block;
}
.saveTr{
    height: 32px;
    text-align: right;
}

</style>