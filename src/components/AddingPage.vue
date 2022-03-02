<template>
    <div class="addingDiv">
        <table class="addingTable">
            <colgroup>
                <col style="width:25%">
                <col style="width:25%">
                <col style="width:25%">
                <col style="width:25%">
            </colgroup>

            <tr class="upperTr">
                <td class="rightTd">
                    <p align="left" class="topLabel">Session name</p>
                </td>
                <td colspan="2">
                    <input type="text" class="longInput" id="sessionNameInput" name="sessionNameInput" v-model="sessionName">
                </td>
                <td class="rightTd">
                    <button class="upBtn" type="button" v-on:click="resetSession">
                            Reset
                    </button>
                    <button class="upBtn" type="button" v-on:click="addSession">
                        Save
                    </button>
                </td>
            </tr>

            <tr class="upperTr">
                <td class="rightTd">
                    <p align="left" class="topLabel">Proto</p>
                </td>
                <td colspan="2">
                    <input type="text" class="longInput" id="protoPath" name="protoPath" v-model="protoPath" readonly>
                </td>
                <td class="rightTd">
                    <button class="upBtn" type="button" v-on:click="loadDialog">
                        Load proto
                    </button>
                </td>
            </tr>
            
            
            <template v-if="nowFlag==2">
                <tr class="blanks"><td></td><td></td><td></td><td></td></tr>
                <tr class="mainTr"> <td colspan="4" class="centerTd"><p class="centerLabel">Proto files</p></td> </tr>
                <tr v-for="(i, index) in protos" v-bind:key="index"  class="allElemTr">
                    <td v-if="index%2==1" colspan="4" class="oddTd"><div class="allElemDiv"><p class="allElements">{{i}}</p></div></td>
                    <td v-else colspan="4" class="evenTd"><div class="allElemDiv"><p class="allElements">{{i}}</p></div></td>
                </tr>
                <tr class="blanks"><td></td><td></td><td></td><td></td></tr>
                <tr class="mainTr"> <td colspan="4" class="centerTd"><p class="centerLabel">Messages</p></td> </tr>
                <tr class="allElemTr">
                    <td colspan="3" class="categoryTd"><p class="categoryLabel">name</p></td>
                    <td class="categoryTd"><p class="categoryLabel">type</p></td>
                </tr>
                <template v-for="(i, index) in protoInform.msg" v-bind:key="index">
                    <tr class="categoryTr"> <td colspan="4" class="allBigTd"><div class="allElemDiv"><p class="allBigElements">{{i.name}}</p></div></td> </tr>
                    <tr class="allElemTr" v-for="(j, subIndex) in i.structs" v-bind:key="subIndex">
                        <td v-if="subIndex%2==1" class="oddTd" ></td>
                        <td v-if="subIndex%2==1" class="oddTd" colspan="2"><div class="allElemDiv"><p class="allElements">{{j.name}}</p></div></td>
                        <td v-if="subIndex%2==1" class="oddTd"><div class="allElemDiv"><p class="allElements">{{j.type}}</p></div></td>
                        <td v-if="subIndex%2==0" class="evenTd" ></td>
                        <td v-if="subIndex%2==0" class="evenTd" colspan="2"><div class="allElemDiv"><p class="allElements">{{j.name}}</p></div></td>
                        <td v-if="subIndex%2==0" class="evenTd"><div class="allElemDiv"><p class="allElements">{{j.type}}</p></div></td>
                    </tr>
                </template>
                <tr class="blanks"><td></td><td></td><td></td><td></td></tr>
                <tr class="mainTr"> <td colspan="4" class="centerTd"><p class="centerLabel">Services</p></td> </tr>
                <tr class="allElemTr">
                    <td colspan="2" class="categoryTd"><p class="categoryLabel">name</p></td>
                    <td class="categoryTd"><p class="categoryLabel">Request</p></td>
                    <td class="categoryTd"><p class="categoryLabel">Response</p></td>
                </tr>
                <template v-for="(i, index) in protoInform.serv" v-bind:key="index">
                    <tr class="categoryTr"> <td colspan="4" class="allBigTd"><div class="allElemDiv"><p class="allBigElements">{{i.name}}</p></div></td> </tr>
                    <tr class="allElemTr" v-for="(j, subIndex) in i.rpcs" v-bind:key="subIndex">
                        <td v-if="subIndex%2==1" class="oddTd" ></td>
                        <td v-if="subIndex%2==1" class="oddTd" ><div class="allElemDiv"><p class="allElements">{{j.name}}</p></div></td>
                        <td v-if="subIndex%2==1" class="oddTd" ><div class="allElemDiv"><p class="allElements">{{j.requestType}}</p></div></td>
                        <td v-if="subIndex%2==1" class="oddTd" ><div class="allElemDiv"><p class="allElements">{{j.responseType}}</p></div></td>
                        <td v-if="subIndex%2==0" class="evenTd" ></td>
                        <td v-if="subIndex%2==0" class="evenTd" ><div class="allElemDiv"><p class="allElements">{{j.name}}</p></div></td>
                        <td v-if="subIndex%2==0" class="evenTd" ><div class="allElemDiv"><p class="allElements">{{j.requestType}}</p></div></td>
                        <td v-if="subIndex%2==0" class="evenTd" ><div class="allElemDiv"><p class="allElements">{{j.responseType}}</p></div></td>
                    </tr>
                </template>


            </template>
            <tr><td colspan="4" class="makeWidth"></td></tr>


        </table>
    </div>
</template>

<script>
var addingPageData = {
    nowFlag:0, // 0: not uploaded, 1 : not available proto, 2 : good proto
    protoPath: "",
    sessionName: "",
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
        if (addingPageData.nowFlag!=2){
             this.$parent.overallDivOn("Not saved", 
            "Please add a proto file",1)
            return
        }
        if (addingPageData.protoInform.serv.length==0){//If it has not Serv list
            this.$parent.overallDivOn("Not saved", 
            "Please add a proto file with services",1)
            return
        }
        electron.ipcRenderer.send('save_session', addingPageData)
    },
    resetSession: function(){
        let defaultData = {
          nowFlag: 0,
          protoPath: "",
          sessionName: "",
          protos: [],
          protoInform: {}
        }
        for(let keys in defaultData){
            this.setData(keys,defaultData.keys)
        }
    }
  },
  created(){
        electron.ipcRenderer.on('load_main_proto_diagram', (evt, payload) => {
            console.log(payload)
            this.setData("nowFlag",2)
            this.setData("protoPath", payload.mainProto)
            this.setData("protos", payload.protos)
            this.setData("protoInform", payload.protoStruct)
            let nowMainProto = payload.mainProto.split("/").pop().split("\\").pop()
            this.setData("sessionName",nowMainProto)
            console.log(addingPageData)
        }) 
        electron.ipcRenderer.on('save_session', (evt, payload) => {
            console.log(payload)
            this.$parent.overallDivOn("Session saved", 
            "'"+this["sessionName"]+"' has been successfully saved and can be used on the left elememts.",0)
            this.resetSession()
        }) 
    }
}

</script>

<style scoped>
.blanks{
    background-color: rgba(0,0,0,0);
    height: 12px;
}
.addingDiv{
    width: 100%;
    height: 100%;
    text-align: center;
}
.addingTable {
  width: 100%;
  height: 100%;
  padding: 8px;
  table-layout: fixed;
  text-align: left;
  max-width: 1280px;
  display: table;
  margin-left:auto;
  margin-right:auto;
}
.upBtn{
    border-radius:2px;
    border: 0px solid;
    background-color: rgb(71, 143, 255);
    color: white;
    padding: 12px;
    transition: 0.2s;
    display: inline-block;
    margin: 2px;
    font-weight: 100;
    font-size: 12px;
    font-family: Avenir;
}
.upBtn:hover{
    background-color: rgb(131, 178, 252);
}
.upBtn:focus{
    outline:none;
}
.rightTd{
    text-align: right;
}
.centerTd{
    text-align: center;
    background-color: rgb(71, 143, 255)
}

.longInput{
    border-radius: 16px;
    border: 1px solid rgb(197, 218, 250);
    font-weight: 100;
    font-size: 12px;
    font-family: Avenir;
    width: 94%;
    padding: 10px;
    margin: 2px;
}
.longInput:focus{
    outline:none;
}
.topLabel{
    font-weight: 100;
    font-size: 16px;
    font-family: Avenir;
    display: inline-block;
    margin: 0px 16px 0px 2px;
}
.centerLabel{
    font-weight: 300;
    font-size: 20px;
    font-family: Avenir;
    display: inline-block;
    margin: 6px 0px 6px 0px;
    color: white;
}
.categoryTd{
    background-color: rgb(197, 218, 250);
    text-align: center;
}
.categoryLabel{
    font-weight: 100;
    font-size: 14px;
    font-family: Avenir;
    display: inline-block;
    margin: 2px 0px 2px 0px;
    color: black;
}
.allBigElements{
    font-weight: 300;
    font-size: 18px;
    font-family: Avenir;
    display: inline-block;
    margin: 4px 0px 4px 24px;
    color: white;
}
.allElements{
    font-weight: 100;
    font-size: 14px;
    font-family: Avenir;
    display: inline-block;
    margin: 2px 0px 2px 0px;
    color: black;
}
.allElemDiv{
    word-break:break-all;
    word-wrap:break-word;
    margin: 0px 8px;
}
.allBigTd{
    background-color: rgb(133, 193, 255);
}
.oddTd{background-color: rgb(232, 242, 255);}
.evenTd{background-color: rgb(242, 247, 252);}

.upperTr{height: 46px; width:100%}
.mainTr{height:42px;}
.categoryTr{height:32px;}
.allElemTr{height:24px;}
.makeWidth{width:100%;}
</style>