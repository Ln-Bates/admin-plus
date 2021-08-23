<template>
  <div class="table-container">
    <el-table
      v-bind="tableConfig"
      :data="data"
      :highlight-current-row="options.singleSelection"
      ref="hook-table"
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @current-change="handleCurrentChange"
    >
      <el-table-column
        v-if="options.index"
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        v-if="options.selection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="options.singleSelection"
        label="选择"
        width="55"
      >
        <template slot-scope="{ row }">
          <el-radio
            v-model="singleVal"
            :label="row.id"
          >
            <i></i>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column) in visibleTableColumns"
        :key="column.prop"
        :prop="column.prop"
        :width="setWidth(column)"
        :sortable="hasSort(column)"
        :fixed="column.type === 'btn-group' ? 'right' : false"
      >
        <template #header>
          {{ column.label }}
          <question
            v-if="column.question"
            :content="column.question"
          />
        </template>
        <template #default="{row, $index}">
          <template v-if="!column.type || column.type === 'default'">
            {{ row[column.prop] }}
          </template>
          <template v-else-if="column.type === 'long'">
            <el-tooltip
              :content="row[column.prop]"
              :open-delay="300"
              effect="dark"
              placement="top"
            >
              <div class="text-ellipsis">
                {{ row[column.prop] }}
              </div>
            </el-tooltip>

          </template>
          <template v-else-if="column.type === 'image'">
            <el-tooltip
              placement="right"
              effect="light"
            >
              <div slot="content">
                <el-image
                  :src="row[column.prop]"
                  class="img-big"
                  fit="cover"
                />
              </div>
              <el-image
                :src="row[column.prop]"
                class="img-small"
                fit="cover"
              />
            </el-tooltip>
          </template>
          <template v-else-if="column.type === 'switch'">
            <!-- <form-switch
              v-model="row[column.prop]"
              v-bind="column.config"
              :open="computedText(row, column)"
              @changed="switchChange($event, row, column)"
            /> -->
            <!--{{row[column.prop]}}-->
          </template>
          <template v-else-if="column.type === 'btn'">
            <el-button
              type="text"
              @click="handleClick(row, $index, column.handler)"
            >
              {{ column.btnText }}
            </el-button>
          </template>
          <template v-else-if="column.type === 'btn-group'">
            <template v-for="(btn, index) in column.btns">
              <el-button
                v-if="showBtn(btn, row, $index) !== false"
                :key="index"
                type="text"
                class="handle-btn"
                @click="handleClick(row, $index, btn.handler)"
              >
                {{ btn.label }}
              </el-button>

            </template>
          </template>
          <template v-else-if="column.type === 'slot'">
            <slot
              :name="column.prop"
              :row="row"
              :index="$index"
            />
          </template>
        </template>
      </el-table-column>
      <template #empty></template>
    </el-table>
  </div>
</template>

<script>
// import FormSwitch from '../form-switch';
const SELECTION_EVENT = 'selection';
import TwoWay from 'mixins/two-way';
import {
  get as _get
} from 'lodash/object';

export default {
  name: 'data-table',
  components: {
    // FormSwitch
  },
  mixins: [TwoWay],
  props: {
    tableConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      type: Object,
      default() {
        return {
          columns: [],
          memory: false,
          selectionKeyword: 'id',
          defaultSelection: []
        };
      }
    }
  },
  data() {
    return {
      multipleSelection: {},
      singleVal: '',
      unwatch: null
    };
  },
  computed: {
    /**
     * 是否开启记忆
     */
    memory() {
      const { memory, selection } = this.options;
      return memory && selection;
    },
    /**
     * 记忆关键字 默认为id
     */
    selectionKeyword() {
      return this.options.selectionKeyword || 'id';
    },
    /**
     * 默认选中项
     */
    defaultSelection() {
      return this.options.defaultSelection;
    },
    /**
     * 表格可见列
     */
    visibleTableColumns() {
      return this.options.columns.filter(item => item.show !== false);
    }
  },
  methods: {
    getColumnVal(row, column) {
      if (column.prop.split('.').length > 1) {
        return _get(row, column.prop);
      }
      return row[column.prop];
    },
    /**
     * 触发选中事件 记忆模式专用
     */
    emitSelection() {
      const multipleSelection = this.multipleSelection;
      const selection = [];
      Object.keys(multipleSelection).forEach(key => {
        selection.push(multipleSelection[key]);
      });
      this.$emit(SELECTION_EVENT, selection);
      this.val.selection = selection;
    },
    /**
     * 单选 记忆模式专用
     */
    handleSelect(selection, row) {
      if (this.memory) {
        // 避免和记忆触发冲突( 选中先后顺序冲突 )
        setTimeout(() => {
          const { multipleSelection, selectionKeyword } = this;
          const prop = row[selectionKeyword];
          if (multipleSelection[prop]) {
            delete multipleSelection[prop];
          } else {
            multipleSelection[prop] = row;
          }
          this.emitSelection();
        }, 200);
      }
    },
    /**
     * 全选 记忆模式专用
     */
    handleSelectAll(selection) {
      if (this.memory) {
        const { multipleSelection, selectionKeyword } = this;

        if (selection.length) {
          selection.forEach(
            row => (multipleSelection[row[selectionKeyword]] = row)
          );
        } else {
          this.data.forEach(row => {
            const prop = row[selectionKeyword];
            if (multipleSelection[prop]) {
              delete multipleSelection[prop];
            }
          });
        }
        this.emitSelection();
      }
    },
    /**
     * 表格选中状态切换 非记忆模式
     */
    handleSelectionChange(selection) {
      if (!this.memory) {
        this.$emit(SELECTION_EVENT, selection);
        this.val.selection = selection;
      }
    },
    /**
     * 触发选中 记忆模式专用
     */
    triggerSelect() {
      this.$nextTick(() => {
        const multipleSelection = this.multipleSelection;
        const prop = this.selectionKeyword;
        const keys = Object.keys(multipleSelection);
        const hasSelection = row => keys.find(key => key === String(row[prop]));
        if (keys.length) {
          this.data.forEach(row => {
            if (hasSelection(row)) {
              this.$refs['hook-table'].toggleRowSelection(
                row,
                true
              );
            }
          });
        }
      });
    },
    /**
     * 初始化选中数据 记忆模式专用
     */
    initSelection() {
      const { defaultSelection, multipleSelection } = this;
      const isInit =
        defaultSelection.length &&
        !Object.keys(multipleSelection).length;
      if (isInit) {
        defaultSelection.forEach(item => {
          const prop = item[this.selectionKeyword];
          multipleSelection[prop] = item;
        });
      }
    },
    /**
     * 按钮点击
     * @param row
     * @param index
     * @param handler
     */
    handleClick(row, index, handler) {
      if (handler && typeof handler === 'function') {
        handler(row, index);
      } else {
        throw new Error('handler is not a function');
      }
    },
    showBtn(btn, row, index) {
      if (!btn.show) return true;
      const result = btn.show(row, index);
      return result;
    },
    switchChange(v, row, column) {
      const config = column.config;
      if (config && config.cb) {
        config.cb(v, row);
      } else {
        throw new Error('缺少回调方法');
      }
    },
    computedText(row, column) {
      const open = column.config.open;
      if (typeof open === 'string') {
        return open;
      }
      return open(row);
    },
    setWidth(column) {
      return column.width || (column.config && column.config.width);
    },
    hasSort(column) {
      return column.config && column.config.sort ? 'custom' : false;
    },
    handleSortChange(result) {
      this.$emit('sort-change', {
        prop: result.prop || '',
        order: result.order || ''
      });
    },
    handleCurrentChange(val) {
      if (this.options.singleSelection) {
        this.$emit('single-selection', val);
        this.val.singleSelection = val;
        this.singleVal = val ? val.id : '';
      }
    }
  },
  mounted() {
    if (this.memory) {
      this.initSelection();
      this.$watch(() => this.data, () => {
        this.triggerSelect();
      }, {
        immediate: true
      });
    }
  },
  beforeDestroy() {
    const { selection, singleSelection } = this.options;
    if (singleSelection) {
      this.$emit('single-selection', '');
      this.val.singleSelection = '';
    }
    if (selection) {
      this.$emit(SELECTION_EVENT, []);
      this.val.selection = [];
    }
    if (this.unwatch) {
      this.unwatch();
    }
  }
};
</script>

<style lang="scss" scoped>
.img-big {
  width: 150px;
  height: 150px;
  border-radius: $radius;
}

.img-small {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: $radius;
}

.handle-btn {
  margin-right: $size-small;

  & + & {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
