<template>
    <div class='outer'>
        <span class='spanName'>{{name}}</span><br>
        <span class='spanProto'>{{proto}}</span><br>
        <span class='spanTS'>{{timestamp}}</span>
    </div>
</template>

<script>
export default {
  name: 'LeftElement',
  props: {
    name: String,
    proto: String,
    timestamp : String
  }
}
</script>

<style scoped>
.outer{
    width: 120px;
    height: 64px;
    background-color : gray;
}
.outer .spanName{
    font-size: 24px;
}
.outer .spanProto{
    font-size: 16px;
}
.outer .spanTS{
    font-size: 16px;
}

</style>
