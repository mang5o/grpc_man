<template>
    <div class='outer'>
        <draggable 
            v-model="nowTab" 
            group="elems" 
            @end="leftMove" 
            item-key="id">
            <template #item="{element}">
                <div class='tabElem'>{{element.name}}</div>
            </template>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
var tabData = {
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

    //TabData
    nowTab : [
        {id: 0, type: 0, name: "Setting"},
        {id: 1, type: 1, name: "RPC"},
        {id: 2, type: 1, name: "RPC2"},
    ]
}
export default {
  name: 'RightTab',
  components: {
      draggable
  },
  data: function() {
      return tabData
  },
  methods:{
      setData: function(key, val){
            this[key] = val
      },
      leftMove: function(){
        //sortable changed
        console.log(tabData.nowTab)
      },
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
.outer{
    position: inherit;
    width: 100%;
    height: min-content;
    text-align: left;
}
.tabElem{
    position: inherit;
    width: 200px;
    height: 24px;
    background-color: red;
    display: inline-block;
}

</style>