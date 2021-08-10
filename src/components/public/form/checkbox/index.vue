<template>
  <el-input v-model="val" />
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