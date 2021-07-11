<template>
    <div class='welcomePage'>
        {{textSources}}
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

    textSources: '# Loading readme.md'
}
export default {
  name: 'WelcomePage',
  components: {
  },
  data: function() {
      return layoutData
  },
  methods:{
      setData: function(key, val){
            this[key] = val
        },
        patchGet : function(){
            var mdUrl = "https://raw.githubusercontent.com/mang5o--"
            var xmlHttp = null;
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", mdUrl, false );
            xmlHttp.send( null );
            this.textSources = xmlHttp.responseText
        }
  },
  created(){
    //   this.patchGet()
        const electron = window.require("electron")
        electron.ipcRenderer.send('get_layout_color', '')
        electron.ipcRenderer.on('layout_get_configs', (evt, payload) => {
            for (var key in payload){
                this.setData(key, payload[key])
            }
        })
    }
}
</script>

<style scoped>
.welcomePage {
  position: inherit;
  height: 100%;
  display: inline-block;
  overflow-y: scroll;
}
</style>