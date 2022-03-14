<template>
    <table class="overallLeftTable">
        <tr class="titleTr">
            <td class="explorerTd">
                <p class="explorerP">EXPLORER</p>
            </td>
        </tr>







        <tr v-if="!(nowModifMode)">
            <div class="tdDiv">
                <div v-for="(session, index) in nowSessions" v-bind:key="index" class="sessionElem">
                    <template v-if="session.toggleAll">
                        <table class="leftTable">
                            <tr>
                                <td class="btnTd"  v-on:click="toggleStage(index,0)">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/toggleOff.png">
                                    </div>
                                </td>
                                <td  v-on:click="toggleStage(index,0)">
                                    <p class="nameElem">{{session.sessionName}}</p>
                                </td>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg2" src="./LeftSession/LeftImgs/startProto.png">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </template>
                    <template v-else>
                        <table class="leftTable">
                            <tr>
                                <td class="btnTd"  v-on:click="toggleStage(index,0)">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/toggleOn.png">
                                    </div>
                                </td>
                                <td  v-on:click="toggleStage(index,0)">
                                    <p class="nameElem">{{session.sessionName}}</p>
                                </td>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg2" src="./LeftSession/LeftImgs/startProto.png">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </template>

                    <template v-if="session.toggleAll">
                        <template v-if="session.toggleProto">
                            <table class="leftTable" v-on:click="toggleStage(index,1)">
                                <tr>
                                    <td class="btnTd2">
                                        <div class="expandElem">
                                            <img class="expandImg" src="./LeftSession/LeftImgs/toggleOff.png">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="nameElem2">Proto files</p>
                                    </td>
                                </tr>
                            </table>
                        </template>
                        <template v-else>
                            <table class="leftTable" v-on:click="toggleStage(index,1)">
                                <tr>
                                    <td class="btnTd2">
                                        <div class="expandElem">
                                            <img class="expandImg" src="./LeftSession/LeftImgs/toggleOn.png">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="nameElem2">Proto files</p>
                                    </td>
                                </tr>
                            </table>
                        </template>
                    </template>

                    <template v-if="session.toggleProto && session.toggleAll">
                        <table class="leftTable" v-for="(elem, subIndex) in session.protos" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd3">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemProto.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem3">{{elem}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>

                    <template v-if="session.toggleAll">
                        <template v-if="session.toggleMsg">
                            <table class="leftTable" v-on:click="toggleStage(index,2)">
                            <tr>
                                <td class="btnTd2">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/toggleOff.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem2">Messages</p>
                                </td>
                            </tr>
                        </table>
                        </template>
                        <template v-else>
                            <table class="leftTable" v-on:click="toggleStage(index,2)">
                                <tr>
                                    <td class="btnTd2">
                                        <div class="expandElem">
                                            <img class="expandImg" src="./LeftSession/LeftImgs/toggleOn.png">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="nameElem2">Messages</p>
                                    </td>
                                </tr>
                            </table>
                        </template>
                    </template>


                    <template v-if="session.toggleMsg && session.toggleAll">
                        <table class="leftTable" v-for="(elem, subIndex) in session.protoInform.msg" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd3">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemMsg.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem3">{{elem.name}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>



                    <template v-if="session.toggleAll">
                        <template v-if="session.toggleServ">
                            <table class="leftTable"  v-on:click="toggleStage(index,3)">
                                <tr>
                                    <td class="btnTd2">
                                        <div class="expandElem">
                                            <img class="expandImg" src="./LeftSession/LeftImgs/toggleOff.png">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="nameElem2">Services</p>
                                    </td>
                                </tr>
                            </table>
                        </template>
                        <template v-else>
                            <table class="leftTable" v-on:click="toggleStage(index,3)">
                                <tr>
                                    <td class="btnTd2">
                                        <div class="expandElem">
                                            <img class="expandImg" src="./LeftSession/LeftImgs/toggleOn.png">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="nameElem2">Services</p>
                                    </td>
                                </tr>
                            </table>
                        </template>
                    </template>



                    <template v-if="session.toggleServ && session.toggleAll">
                        <table class="leftTable" v-for="(elem, subIndex) in session.protoInform.serv" v-bind:key="subIndex">
                            <tr>
                                <td class="btnTd3">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/elemServ.png">
                                    </div>
                                </td>
                                <td>
                                    <p class="nameElem3">{{elem.name}}</p>
                                </td>
                            </tr>
                        </table>
                    </template>
                </div>
            </div>
        </tr>

        <tr v-if="nowModifMode">
        <draggable
            :list="nowSessions"
            item-key="nowKey"
            class="list-group"
            ghost-class="ghost"
            @start="dragging = true"
            @end="dragging = false">

            <template #item="{ element }">
            <div class="list-group-item">
                <div class="sessionElem">
                    <table class="leftTable">
                            <tr>
                                <td class="btnTd">
                                    <div class="expandElem">
                                        <img class="expandImg" src="./LeftSession/LeftImgs/leftMov.png">
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="longInput" v-model="element.sessionName">
                                </td>
                                <td class="btnTd" v-on:click="delAllDiv(element.sessionName, element.nowKey)">
                                    <div class="expandElem">
                                        <img class="expandImg2" src="./LeftSession/LeftImgs/rightDel.png">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </template>
        </draggable>
        </tr>








        <tr class="addingTr">
            <td class="addingDiv">
                Adding a new .proto file
            </td>
        </tr>

        
        <tr class="optionTr">
            <td class="optionTd">
                <label class="form-switch">
                <input type="checkbox" v-model="nowModifMode" v-on:click="toggleOption()">
                <i></i>
                Modification mode
                </label>
            </td>
        </tr>
    </table>
    
</template>

<script>
var sessionData = {
    nowKey:-1,
    nowSessions : [],
    nowModifMode: false
}
const electron = window.require("electron")
import draggable from "vuedraggable";
export default {
    name: 'LeftSession',
    data: function() {
      return sessionData
    },
    components: {
      draggable
    },
    methods:{
        setData: function(sessionDataParam){
            for(let key in sessionDataParam){
                this[key] = sessionDataParam[key]
            }
        },
        reloadSession: function(){
            electron.ipcRenderer.send('reload_session')
        },
        toggleStage: function(sessionIdx, stagePosition){
            let stageKey = ["toggleAll","toggleProto","toggleMsg","toggleServ"]
            this.nowSessions[sessionIdx][stageKey[stagePosition]] = !(this.nowSessions[sessionIdx][stageKey[stagePosition]])
            if (stagePosition==0 && !this.nowSessions[sessionIdx][stageKey[0]]){
                this.nowSessions[sessionIdx][stageKey[1]] = false
                this.nowSessions[sessionIdx][stageKey[2]] = false
                this.nowSessions[sessionIdx][stageKey[3]] = false
            }
        },
        toggleOption : function(){
            if(this.nowModifMode){
                this.saveNowSession()
            }
            for(let sess = 0; sess<this.nowSessions.length; sess++){
                    let stageKey = ["toggleAll","toggleProto","toggleMsg","toggleServ"]
                    for(let sessCnt = 0; sessCnt<stageKey.length; sessCnt++){
                        this.nowSessions[sess][stageKey[sessCnt]] = false
                    }
                }
            this.nowModifMode = !(this.nowModifMode)

        },
        saveNowSession : function(){
            let dataToSave = sessionData
            console.log(dataToSave)
            electron.ipcRenderer.send('save_session_left',dataToSave)
            sessionData.nowModifMode = false
        },
        delAllDiv: function(sessionName, nowKey){

            this.$parent.overallDivDelOn("Warning", 
            "Are you sure that you want to delete '"+sessionName+"'?",2,nowKey)
        },
        delNowKeyFromMsg: function(nowDelKey){
            let realItem = this.nowSessions.find(function(item) {return item.nowKey === nowDelKey})
            let realIdx = this.nowSessions.indexOf(realItem)
            if(realIdx != -1){this.nowSessions.splice(realIdx,1)}
            this.saveNowSession()
        }
    },
    created(){
        electron.ipcRenderer.on('reload_session', (evt, payload) => { 
            this.setData(payload)
            for(let sess = 0; sess<this.nowSessions.length; sess++){
                let stageKey = ["toggleAll","toggleProto","toggleMsg","toggleServ"]
                for(let sessCnt = 0; sessCnt<stageKey.length; sessCnt++){
                    this.nowSessions[sess][stageKey[sessCnt]] = false
                }
            }
            this.nowModifMode = false
        }) 
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
    height: 48px;
}
.addingTr{
    height: 32px;
}
.addingDiv{
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    font-family: Avenir;
    text-align: center;
    border: dotted;
    border-radius: 12px;
    cursor: pointer;
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
    margin: 0;
    padding: 3px 0 0 0;
}
.enterElem{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: red;
}
.btnTd{
    width: 20px;
    text-align: right;
}
.btnTd2{
    width: 36px;
    text-align: right;
}
.btnTd3{
    width: 52px;
    text-align: right;
}
.nameElem{
    display: inline-block;
    margin: 0 2px 0px 6px;
    font-weight: 600;
    font-size: 16px;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.nameElem2{
    display: inline-block;
    margin: 0 2px 0px 6px;
    font-weight: 400;
    font-size: 15px;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.nameElem3{
    display: inline-block;
    margin: 0 2px 0px 6px;
    font-weight: 100;
    font-size: 13px;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.leftTable{
    width: 100%;
    margin: 0;
    padding: 0 0 0 0px;
}
.leftTable:hover{
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
}
.expandImg{
    padding: 0 0 0 4px;
    margin: 0;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.expandImg2{
    padding: 0 8px 0 4px;
    margin: 0;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.explorerTd{
    text-align: center;
    background-color: rgba(10, 25, 49,0.8);
    border-radius: 16px;
}
.explorerP{
    font-weight: 400;
    font-size: 20px;
    font-family: Avenir;
    padding: 0px;
    margin: 4px;
    color: white;
}


.tdDiv{
  overflow-y: auto;
  width:100%;
  height:100%;
  overflow-x : hidden;
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


.optionTd{
    text-align: left;
    padding: 6px 2px 6px 8px;
    font-weight: 600;
    font-size: 16px;
    font-family: Avenir;
    background-color: rgba(10, 25, 49, 0.8);
    border-radius: 6px;
    color: white;
}




.longInput{
    border-radius: 16px;
    border: 1px solid rgb(197, 218, 250);
    font-family: Avenir;
    font-weight: 600;
    font-size: 12px;
    width: 84%;
    padding: 10px;
    margin: 2px;
}
.longInput:focus{
    outline:none;
}




/*https://www.cssscript.com/realistic-ios-switch-pure-css/*/
.form-switch {
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  text-align: left;
  margin: 2px;
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
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
.form-switch input:checked + i { background-color: rgb(71, 143, 255); }
.form-switch input:checked + i::before { transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }
.form-switch input:checked + i::after { transform: translate3d(22px, 2px, 0); }
</style>