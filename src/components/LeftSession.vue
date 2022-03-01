<template>
    <div class="leftSessionTd">
            <div v-for="(session, index) in nowSessions" v-bind:key="index" class="sessionElem">
                <table class="leftTable">
                    <tr>
                        <td class="btnTd">
                            <div class="expandElem">
                                <img class="expandImg" v-on:click="toggleStage(index,0)"
                                 v-if="session.toggleAll" src="./LeftSession/LeftImgs/toggleOff.png">
                                <img class="expandImg" v-on:click="toggleStage(index,0)"
                                 v-else src="./LeftSession/LeftImgs/toggleOn.png">
                            </div>
                        </td>
                        <td>
                            <p class="nameElem">{{session.sessionName}}</p>
                        </td>
                    </tr>


                </table>
                <p>{{session.protos}}</p>
            </div>
    </div>
</template>

<script>
var sessionData = {
    nowKey:-1,
    nowSessions : [],
    nowToggleDel: false,
    nowToggleMov: false,
}
const electron = window.require("electron")
export default {
    name: 'LeftSession',
    data: function() {
      return sessionData
    },
    methods:{
        setData: function(sessionDataParam){
            for(let key in sessionDataParam){
                this[key] = sessionDataParam[key]
            }
        },
        reloadSession: function(){
            electron.ipcRenderer.on('reload_session', (evt, payload) => { 
                this.setData(payload)
                for(let sess = 0; sess<this.nowSessions.length; sess++){
                    let stageKey = ["toggleAll","toggleProto","toggleMsg","toggleServ","toggleProcesses"]
                    for(let sessCnt = 0; sessCnt<stageKey.length; sessCnt++){
                        this.nowSessions[sess][stageKey[sessCnt]] = false
                    }
                }
            }) 
            console.log("reload_session : ")
            console.log(sessionData)
            electron.ipcRenderer.send('reload_session')
        },
        toggleStage: function(sessionIdx, stagePosition){
            let stageKey = ["toggleAll","toggleProto","toggleMsg","toggleServ","toggleProcesses"]
            this.nowSessions[sessionIdx][stageKey[stagePosition]] = !(this.nowSessions[sessionIdx][stageKey[stagePosition]])
        }
    },
    created(){
        this.reloadSession()
    }
  }
</script>

<style scoped>
.leftSessionTd{
    width:100%;
    height:100%;
    font-weight: 100;
    font-size: 16px;
    font-family: Avenir;
}
.sessionElem{
    word-break:break-all;
    word-wrap:break-word;
    margin: 0px 8px;
}
.expandElem{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 0px;
    padding: 0px;
}
.enterElem{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: red;
}
.btnTd{
    width: 18px;
    text-align: center;
}
.nameElem{
    display: inline-block;
    margin: 0 4px 6px 4px;
    font-weight: 400;
    font-size: 16px;
}
.leftTable{
    width: 100%;
    margin: 0;
    padding: 0;
}
.expandImg{
    padding:0;
    margin: 0;
}
</style>