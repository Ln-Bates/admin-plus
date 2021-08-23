<template>
  <table-view
    v-model="tableModel"
    :table-options="tableOptions"
    :table-data="tableData"
  >
    <template #slot-handle-left>
      <el-button>哦哦</el-button>
    </template>
    <template #slot-handle-right>
      <el-button>哦哦</el-button>
    </template>
  </table-view>
</template>

<script>
import TableView from 'public/view/table';
import {
  table,
  filter
} from 'helper';
export default {
  components: {
    TableView
  },
  data() {
    return {
      tableOptions: {
        selection: true,
        columns: [
          table.default('测试', 'name'),
          table.default('测试2', 'path.test')
        ],
        filters: [
          filter.input('测试', 'name')
        ],
        config: {}
      },
      tableData: {
        data: [
          { name: '测试1', id: 1, path: { test: '嵌套1' } },
          { name: '测试2', id: 2, path: { test: '嵌套2' } },
          { name: '测试3', id: 3, path: { test: '嵌套3' } },
          { name: '测试4', id: 4, path: { test: '嵌套4' } }
        ],
        total: 4
      },
      tableModel: {
        selection: [],
        filter: {}
      }
    };
  },
  methods: {
    test(v) {
      console.log(v);
    },
    httpTest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      }).then(res => {
        console.log(res);
      });
    },
    request() {
      return this.httpTest();
    }
  }
};
</script>

<style>
</style>