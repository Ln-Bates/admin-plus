<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {
  table,
  form,
  filter
} from 'helper';
export default {
  name: 'app',
  mounted() {
    console.log(table, form, filter);
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
