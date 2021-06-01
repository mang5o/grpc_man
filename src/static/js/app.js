var data = {
    testList: ["A","b","c","d"]
}
import LeftElement from '../../components/LeftElement.vue'
export default {
    name: 'App',
    components: {
      LeftElement
    },
    data: function() {
      return data
    }
  }

  data.testList[2] = "AAAAAAAAAA"