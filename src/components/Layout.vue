<template>
    <div @mouseup="mouseUp" @mousemove="resizeMove">
       <table>
            <tbody>
                <tr>
                    <td class='leftTd' v-bind:style="{ width: leftWidth +'px' }" rowspan=2>

                    </td>
                    <td class='leftResize' @mousedown="onResize"  rowspan=2>

                    </td>
                    <td class='rightTab'>
                    </td>
                </tr>
                <tr>
                    <td class='contents'>
                    </td>
                </tr>
            </tbody>
       </table>
    </div>
</template>

<script>
var layoutData = {
    leftWidth : 50,
    nowDrag   : false
}
export default {
  name: 'Layout',
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
        }
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
.leftTd{
    background-color:#001011;
}
.rightTab{
    background-color:#093A3E;
}
.contents{
    background-color:#3AAFB9;
}
.leftResize{
    background-color:#FFFFFF;
    width:4px;
    height:100%;
    cursor:w-resize;
}

</style>
