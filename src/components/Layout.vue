<template>
    <div @mouseup="mouseUp" @mousemove="resizeMove">
       <table>
            <tbody>
                <tr>
                    <td class='leftTd' v-bind:style="{ width: leftWidth +'px', backgroundColor: left }" rowspan=2>

                    </td>
                    <td class='leftResize' @mousedown="onResize"  rowspan=2>

                    </td>
                    <td class='rightTab' v-bind:style="{ backgroundColor: top }">
                        <RightTab></RightTab>
                    </td>
                </tr>
                <tr>
                    <td class='contents' v-bind:style="{ backgroundColor: center }">
                          <SettingPage></SettingPage>
                    </td>
                </tr>
            </tbody>
       </table>
    </div>
</template>

<script>
import SettingPage from './SettingPage.vue'
import RightTab from './RightTab.vue'
var layoutData = {
    leftWidth   : 150,
    nowDrag     : false,

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
    
}
export default {
  name: 'Layout',
  components: {
      RightTab,
      SettingPage
  },
  data: function() {
      return layoutData
  },
  methods:{
        onResize: function(){
            this.nowDrag = true
        },
        mouseUp: function(){
            this.nowDrag = false
        },
        resizeMove: function(event){
            if(this.nowDrag){
                this.leftWidth = event.pageX
            }
        },
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
    }
}


</script>

<style scoped>
div{
    position: fixed;
    width:100%;
    height:100%;
    padding:0;
    margin:0;
    left:0;
    top:0;
    z-index:10;
}
table{
    width:100%;
    height:100%;
    border-collapse: collapse;
}
tr, td{
    padding:0;
    margin:0;
}
.leftResize{
    background-color:#FFFFFF;
    width:4px;
    height:100%;
    cursor:w-resize;
}
.rightTab {
    height: 2px;
}

</style>
