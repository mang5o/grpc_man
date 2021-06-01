<template>
  <LeftElement name="aa" proto='test.proto' timestamp='20200101'></LeftElement>
    <div v-for='tl in testList' v-bind:key='tl'>
      {{tl}}
    </div>
</template>

<script src='./static/js/app.js'/>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
