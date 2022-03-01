<template>
    <table class="overallLeftTable">
        <tr class="titleTr">
            <td>
                <p>Explorer</p>
            </td>
        </tr>
        <tr>
            <div class="tdDiv">
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
                    <table class="leftToggleTable" v-if="session.toggleAll">
                        <tr>
                            <td class="btnTd">
                                <div class="expandElem">
                                    <img class="expandImg" v-on:click="toggleStage(index,1)"
                                    v-if="session.toggleProto" src="./LeftSession/LeftImgs/toggleOff.png">
                                    <img class="expandImg" v-on:click="toggleStage(index,1)"
                                    v-else src="./LeftSession/LeftImgs/toggleOn.png">
                                </div>
                            </td>
                            <td>
                                <p class="nameElem">Proto files</p>
                            </td>
                        </tr>
                    </table>
                    <template v-if="session.toggleProto">
                        <table class="leftElemTable" v-for="(elem, subIndex) in session.protos" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemProto.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem">{{elem}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>
                    <table class="leftToggleTable" v-if="session.toggleAll">
                        <tr>
                            <td class="btnTd">
                                <div class="expandElem">
                                    <img class="expandImg" v-on:click="toggleStage(index,2)"
                                    v-if="session.toggleMsg" src="./LeftSession/LeftImgs/toggleOff.png">
                                    <img class="expandImg" v-on:click="toggleStage(index,2)"
                                    v-else src="./LeftSession/LeftImgs/toggleOn.png">
                                </div>
                            </td>
                            <td>
                                <p class="nameElem">Messages</p>
                            </td>
                        </tr>
                    </table>
                    <template v-if="session.toggleMsg">
                        <table class="leftElemTable" v-for="(elem, subIndex) in session.protoInform.msg" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemMsg.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem">{{elem.name}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>
                    <table class="leftToggleTable" v-if="session.toggleAll">
                        <tr>
                            <td class="btnTd">
                                <div class="expandElem">
                                    <img class="expandImg" v-on:click="toggleStage(index,3)"
                                    v-if="session.toggleServ" src="./LeftSession/LeftImgs/toggleOff.png">
                                    <img class="expandImg" v-on:click="toggleStage(index,3)"
                                    v-else src="./LeftSession/LeftImgs/toggleOn.png">
                                </div>
                            </td>
                            <td>
                                <p class="nameElem">Services</p>
                            </td>
                        </tr>
                    </table>
                    <template v-if="session.toggleServ">
                        <table class="leftElemTable" v-for="(elem, subIndex) in session.protoInform.serv" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemServ.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem">{{elem.name}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>
                    <table class="leftToggleTable" v-if="session.toggleAll">
                        <tr>
                            <td class="btnTd">
                                <div class="expandElem">
                                    <img class="expandImg" v-on:click="toggleStage(index,4)"
                                    v-if="session.toggleProcesses" src="./LeftSession/LeftImgs/toggleOff.png">
                                    <img class="expandImg" v-on:click="toggleStage(index,4)"
                                    v-else src="./LeftSession/LeftImgs/toggleOn.png">
                                </div>
                            </td>
                            <td>
                                <p class="nameElem">Processes</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </tr>
        <tr class="optionTr">
            <td>
                <label class="form-switch">
                <input type="checkbox">
                <i></i>
                Select Me
                </label>
            </td>
        </tr>
    </table>
    
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
.overallLeftTable{
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
}
.leftSessionTd{
    width:100%;
    font-weight: 100;
    font-size: 16px;
    font-family: Avenir;
}
.optionTr{
    height: 64px;
}
.titleTr{
    height: 32px;
}
.sessionElem{
    word-break:break-all;
    word-wrap:break-word;
    margin: 0px 0px;
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
    margin: 0 2px 6px 2px;
    font-weight: 400;
    font-size: 16px;
}
.leftTable{
    width: 100%;
    margin: 0;
    padding: 0 0 0 4px;
}
.leftToggleTable{
    width: 100%;
    margin: 0;
    padding: 0 0 0 12px;
}
.leftElemTable{
    width: 100%;
    margin: 0;
    padding: 0 0 0 20px;
}
.expandImg{
    padding:0;
    margin: 0;
}



.tdDiv{
  overflow-y: auto;
  width:100%;
  height:100%;
}
.tdDiv:hover::-webkit-scrollbar-thumb {
  background-color: white;
  border: 1px solid transparent;
}
.tdDiv:hover::-webkit-scrollbar-track {
  background-color: rgb(71, 143, 255);
}
.tdDiv::-webkit-scrollbar {
  width: 10px;
}
.tdDiv::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0);
  border-radius: 10px;
  background-clip: padding-box;
}
.tdDiv::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
  border-radius: 10px;
}








/*https://www.cssscript.com/realistic-ios-switch-pure-css/*/
.form-switch {
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.form-switch i {
  position: relative;
  display: inline-block;
  margin-right: .5rem;
  width: 46px;
  height: 26px;
  background-color: #e6e6e6;
  border-radius: 23px;
  vertical-align: text-bottom;
  transition: all 0.3s linear;
}
.form-switch i::before {
  content: "";
  position: absolute;
  left: 0;
  width: 42px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
  transition: all 0.25s linear;
}
.form-switch i::after {
  content: "";
  position: absolute;
  left: 0;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
  transform: translate3d(2px, 2px, 0);
  transition: all 0.2s ease-in-out;
}
.form-switch:active i::after {
  width: 28px;
  transform: translate3d(2px, 2px, 0);
}
.form-switch:active input:checked + i::after { transform: translate3d(16px, 2px, 0); }
.form-switch input { display: none; }
.form-switch input:checked + i { background-color: #4BD763; }
.form-switch input:checked + i::before { transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }
.form-switch input:checked + i::after { transform: translate3d(22px, 2px, 0); }
</style>