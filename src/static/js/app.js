import draggable from 'vuedraggable'
import LeftElement from '../../components/LeftElement.vue'



var data = {
    testList: ["A","b","c","d"],
    myArray:[
      {name: "AA11"},
      {name: "AA112"},
      {name: "AA113"},
      {name: "AA114"},
    ]
}

export default {
    name: 'App',
    components: {
      LeftElement,
      draggable
    },
    data: function() {
      return data
    },
    methods:{
      leftMove: function(){
        //sortable changed
        console.log(data.myArray)
      }
    }
  }

  data.testList[2] = "AAAAAAAAAA"