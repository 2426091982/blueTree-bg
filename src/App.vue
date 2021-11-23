<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useCssModule } from '@vue/runtime-dom';
import HelloWorld from './components/HelloWorld.vue'
let style = useCssModule();

</script>

<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <a-button>123123123</a-button>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
    color: #ddd;
}
</style>
