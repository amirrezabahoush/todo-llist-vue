<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './layout/Header.vue';
export default {
  name: 'app',
  components: {
    'app-header': header
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Nunito SemiBold';
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
