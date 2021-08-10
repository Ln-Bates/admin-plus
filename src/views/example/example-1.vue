<template>
  <base-view :confirm-request="test">
    <p
      v-for="i in 200"
      :key="i"
    >
      {{i}}
    </p>
  </base-view>
</template>

<script>
import BaseView from 'public/view/base';
export default {
  components: {
    BaseView
  },
  methods: {
    test() {
      return new Promise(resolve => {
        resolve();
      });
    }
  }
};
</script>

<style>
</style>