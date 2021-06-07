const electron = window.require("electron")
electron.ipcRenderer.send('get_configs', '')
import draggable from 'vuedraggable'
import LeftElement from '../../components/LeftElement.vue'
import Layout from '../../components/Layout.vue'

var data = {
    config:{
      
    },
    palette : {

    },
    testList: ["A","b","c","d"],
    myArray:[
      {name: "AA11"},
      {name: "AA112"},
      {name: "AA113"},
      {name: "AA114"},
    ]
}

electron.ipcRenderer.on('renderer_get_configs', (evt, payload) => {
  data.config = payload.userData
  data.palatte = payload.palette
})

export default {
    name: 'App',
    components: {
      LeftElement,
      draggable,
      Layout
    },
    data: function() {
      return data
    },
    methods:{
      leftMove: function(){
        //sortable changed
        console.log(data.myArray)
      },
      onResize: function(e){
        console.log(e.pageX)
    }
    }
  }


