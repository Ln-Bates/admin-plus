<template>
  <el-pagination
    :page-sizes="PAGE_SIZES"
    :current-page="val[PAGE_NUM_KEY]"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
import { PAGE_SIZES, PAGE_NUM_KEY, PAGE_SIZE_KEY } from 'constant';
import TwoWay from 'mixins/two-way';

export default {
  name: 'pagination',
  mixins: [TwoWay],
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      PAGE_SIZES,
      PAGE_NUM_KEY,
      [PAGE_SIZE_KEY]: PAGE_SIZES[0],
      layout: 'total, sizes, prev, pager, next'
    };
  },
  methods: {
    handleSizeChange(size) {
      this.val[PAGE_SIZE_KEY] = size;
      this.$emit('change-size', size);
    },
    handleCurrentChange(current) {
      this.val[PAGE_NUM_KEY] = current;
      this.$emit('change-page', current);
    }
  },
  mounted() {
    const pageSize = this.val.pageSize;
    if (pageSize) {
      this[PAGE_SIZE_KEY] = pageSize;
    }
  }
};
</script>

<style scoped>
</style>
