<template>
    <div class="leftSessionTd">
            <div v-for="(session, index) in nowSessions" v-bind:key="index" class="sessionElem">
                <table class="leftTable">
                    <tr>
                        <td class="btnTd">
                            <div class="expandElem"></div>
                        </td>
                        <td>
                            <p class="nameElem">{{session.sessionName}}</p>
                        </td>
                        <td class="btnTd">
                            <div class="enterElem"></div>
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
    nowSessions : [
        {sessionName:"ABC"},
        {sessionName:"ABCD"},
        {sessionName:"ABCE"}
    ]
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
    },
    created(){
        electron.ipcRenderer.on('reload_session', (evt, payload) => { this.setData(payload) }) 
        console.log("reload_session : ")
        console.log(sessionData)
        electron.ipcRenderer.send('reload_session')
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
    width: 16px;
    height: 16px;
    background-color: red;
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
    width: 100%
}
</style>