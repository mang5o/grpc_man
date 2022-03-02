<template>
    <div class="overallDiv" v-if="nowOverall">
        <div class="overallTableDiv">
            <table class="overallTable">
                <tr class="overallTableTr">
                    <td v-if="flag==0">
                        <img class="topImg" src="./OverallMsg/okay.png">
                    </td>
                    <td v-else>
                        <img class="topImg" src="./OverallMsg/error.png">
                    </td>
                </tr>
                <tr class="overallTableTr">
                    <td>
                        <p class="overallMainMsg">{{mainMsg}}</p>
                    </td>
                </tr>
                <tr class="overallTableTr">
                    <td>
                        <p class="overallMsg">{{msg}}</p>
                    </td>
                </tr>
                <tr class="overallTableTr">
                    <td>
                        <button class="overallBtn" type="button" v-on:click="delDiv()">
                                Confirm
                        </button>
                    </td>
                </tr>
            </table>

        </div>
        
    </div>
</template>


<script>
var overallMsg = {
    mainMsg: "",
    msg : "",
    flag : 0, // 0: normal, 1: error
    nowBtn : false,
    nowOverall: false
}
export default {
    name: 'LayoutTable',
    data: function() {
      return overallMsg
    },
    methods:{
        setMainMsg : function(mainMsg){ this["mainMsg"] = mainMsg },
        setMsg : function(msg){ this["msg"] = msg },
        setFlag : function(flag){ this["flag"] = flag },
        makeBtn: function(){ this["nowBtn"] = true },
        delBtn: function(){ this["nowBtn"] = false },
        makeDiv: function(){ this["nowOverall"] = true },
        delDiv: function(){ this["nowOverall"] = false }
    }
  }
</script>

<style scoped>
.overallDiv{
    position:fixed;
    padding:0;
    margin:0;

    top:0;
    left:0;

    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.9);

    display: flex;
    align-items: center;
    text-align: center;

    z-index:2;
}
.overallTableDiv{
    display: inline-block;
    margin: 0 auto;
    background-color: white;
    padding: 18px;
    width: 400px;
    border-radius: 8px;
}
.overallMsg{
    width: 100%;
    font-weight: 100;
    font-size: 20px;
    font-family: Avenir;
    margin: 8px 0 16px 0;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.overallMainMsg{
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    font-family: Avenir;
    margin: 8px 0;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.overallBtn{
    border-radius:2px;
    border: 0px solid;
    background-color: rgb(71, 143, 255);
    color: white;
    padding: 12px;
    transition: 0.2s;
    display: inline-block;
    margin: 2px;
    font-weight: 100;
    font-size: 12px;
    font-family: Avenir;
}
.overallBtn:hover{
    background-color: rgb(131, 178, 252);
}
.overallBtn:focus{
    outline:none;
}
.overallTableTr{
    width:100%;
}
.overallTable{
    display: inline-block;
}
.topImg{
    margin: 12px 0 0 0;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
</style>
