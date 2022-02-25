<template>
    <table class="layoutTable">
        <tr>
            <td class="leftTd">
              <div class="tdDiv">
                <LeftSession>
                </LeftSession>
              </div>
            </td>
            <td class="addingTd">
              <div class="tdDiv">
                <AddingPage>
                </AddingPage>
              </div>
            </td>
        </tr>

    </table>
</template>

<script>
import AddingPage from './AddingPage.vue'
import LeftSession from './LeftSession.vue'
var layoutData = {

}
export default {
    name: 'LayoutTable',
    components: {
      AddingPage,
      LeftSession
    },
    data: function() {
      return layoutData
    },
    methods:{
  
    }
  }
</script>

<style scoped>
.layoutTable {
  width: 100%;
  height: 100%;
  padding: 0px;
  table-layout: fixed;
  text-align: left;
  display: table;
}
.leftTd{
  width:240px;
  padding:0px;
  background-color: rgb(232, 242, 255);
}
.tdDiv{
  overflow-y: auto;
  width:100%;
  height:100%;
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
</style>