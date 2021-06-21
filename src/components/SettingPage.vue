<template>
    <div class='settingPage'>
        <h3>User name : </h3>
        <input v-model="userName" placeholder="User name">
        <br>
        
    </div>
</template>

<script>
var layoutData = {
    //Color
    name   : " ",
    left   : "#000000",
    top    : "#000000",
    center : "#000000",
    text   : "#000000",
    warn   : "#000000",
    high   : "#000000",
    back   : "#000000",
    lalpha : 0,
    talpha : 0,

    //UserData
    userName : "",
    metaData : [],
    timeOut : 1.0, //Second
    nowColor: "Original",
    packageDefinition : {
        
    }
}
export default {
  name: 'SettingPage',
  data: function() {
      return layoutData
  },
  methods:{
      setData: function(key, val){
            this[key] = val
        }
  },
  created(){
        const electron = window.require("electron")
        electron.ipcRenderer.send('get_layout_color', '')
        electron.ipcRenderer.on('layout_get_configs', (evt, payload) => {
            for (var key in payload){
                this.setData(key, payload[key])
            }
        })
        electron.ipcRenderer.send('get_user_data', '')
        electron.ipcRenderer.on('user_get', (evt, payload) => {
            console.log(payload)
            for (var key in payload){
                this.setData(key, payload[key])
            }
        })
    }
}
</script>

<style scoped>
.settingPage {
  position: inherit;
  width: 100%;
  height: 100px;
  display: inline-block;
  background-color: gray;
}

</style>