<template>
  <base-view
    :show-handle="false"
    class="table-view"
  >
    <div
      v-if="$slots['slot-custom']"
      class="container custom"
    >
      自定义
    </div>
    <div class="container filter">
      <filters
        v-model="val.filter"
        :filters="tableOptions.filters"
      />
    </div>
    <div
      v-if="showHandle"
      class="container handle"
    >
      <div class="handle-left">
        <slot name="slot-handle-left" />
      </div>
      <div class="handle-right">
        <slot name="slot-handle-right" />
      </div>
    </div>
    <div class="container table">
      <data-table
        v-model="val"
        v-loading="loading || requestLoading"
        v-on="$listeners"
        :data="tableData.data"
        :options="tableOptions"
      />
    </div>
    <template #slot-footer>
      <div class="table-footer">
        <div class="table-footer-left"></div>
        <pagination
          v-model="pageModel"
          :total="tableData.total"
          @change-size="onSizeChange"
          @change-page="onPageChange"
        />
      </div>
    </template>
  </base-view>
</template>

<script>

import BaseView from './base';
import DataTable from '../data-table/index';
import Filters from '../filter/index.vue';
import Pagination from '../pagination/index';
import TwoWay from 'mixins/two-way';
import { PAGE_SIZES, PAGE_NUM_KEY, PAGE_SIZE_KEY } from 'constant';
export default {
  components: {
    BaseView,
    DataTable,
    Filters,
    Pagination
  },
  mixins: [TwoWay],
  props: {
    tableOptions: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Object,
      default: () => ({})
    },
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      pageModel: {
        [PAGE_NUM_KEY]: 1,
        [PAGE_SIZE_KEY]: PAGE_SIZES[0]
      }
    };
  },
  computed: {
    showHandle() {
      return this.$slots['slot-handle-left'] || this.$slots['slot-handle-right'];
    }
  },
  methods: {
    onSizeChange(size) {
      const pageModel = this.pageModel;
      pageModel[PAGE_SIZE_KEY] = size;
      pageModel[PAGE_NUM_KEY] = 1;
      this.getData();
    },
    onPageChange(page) {
      this.pageModel[PAGE_NUM_KEY] = page;
      this.getData();
    },
    getData() {
      return new Promise(resolve => {
        if (this.requestLoading === undefined) {
          this.loading = true;
        }
        this.$emit('get-data', this.pageData, () => {
          this.loading = false;
          resolve();
        });
      });
    }
  },
  mounted() {
    console.log(this.tableOptions);
  }
};
</script>

<style lang="scss" scoped>
.table-view {
  padding-right: $size-middle;
}
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  line-height: 1;
}
.container {
  padding: $size-small;
  border-radius: $radius;
  margin-bottom: $size-middle;

  &.table {
    margin-bottom: 0;
  }

  &.custom,
  &.filter,
  &.handle {
    background: #fff;
  }

  &.handle {
    display: flex;
    justify-content: space-between;
  }
}
</style>