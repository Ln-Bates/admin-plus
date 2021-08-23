<template>
  <el-input
    v-model="val"
    v-bind="$attrs"
  />
</template>

<script>
import TwoWay from 'mixins/two-way';
export default {
  name: 'test',
  mixins: [TwoWay]
};
</script>

<style>
</style>