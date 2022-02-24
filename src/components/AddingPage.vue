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
                    <div v-for="(i, index) in protos" v-bind:key="index" class="nestedDiv">
                        <div class="importDiv">IMPORT</div>
                        <p class="nestedP">{{i}}</p>
                    </div>
                    <div v-for="(i, index) in protoInform.msg" v-bind:key="index" class="nestedDiv">
                        <div class="messageDiv">MESSAGE</div>
                        <p class="nestedP">{{i.name}}</p>
                    </div>
                    <div v-for="(i, index) in protoInform.serv" v-bind:key="index" class="nestedDiv">
                        <div class="serviceDiv">SERVICE</div>
                        <p class="nestedP">{{i.name}}</p>
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
          sessionName: "session name",
          protos: [],
          protoInform: {}
}
const electron = window.require("electron")
export default {
  name: 'AddingPage',
  data: function() {
      return addingPageData
  },
  methods:{
    loadDialog: function(){ electron.ipcRenderer.send('load_main_proto_diagram', '') },
    setData: function(key, val){ this[key] = val },
    addSession: function(){
        if (addingPageData.nowFlag!=2){ return }
        electron.ipcRenderer.send('save_session', addingPageData)
    }
  },
  created(){
        electron.ipcRenderer.on('load_main_proto_diagram', (evt, payload) => {
            console.log(payload)
            this.setData("nowFlag",2)
            this.setData("protoPath", payload.mainProto)
            this.setData("protos", payload.protos)
            this.setData("protoInform", payload.protoStruct)
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