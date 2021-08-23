<template>
  <div class="filters component-container">
    <el-form
      :inline="true"
      class="form-container"
      @submit.native.prevent
    >
      <template v-for="item in filters">
        <el-form-item
          v-show="item.show !== false"
          :key="item.prop"
          :class="{fixed: item.type === 'group', full: item.type === 'slot'}"
        >
          <template v-if="item.type === 'slot'">
            <slot :name="item.prop" />
          </template>
          <template v-else>
            <component
              v-model="val[item.prop]"
              v-bind="generateLibProps(item)"
              :placeholder="item.label"
              :is="`form-${item.type}`"
              @handle-changed="triggerQuery"
            />
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Form from 'public/form';

export default {
  name: 'filters',
  mixins: [Form],
  props: {
    filters: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    /**
     * 构建Element元素属性
     */
    generateLibProps(item) {
      let props = {};
      if (item.config) {
        props = {
          ...item.config
        };
      }
      if (item.options) {
        props.options = item.options;
      }
      return props;
    },
    triggerQuery() {
      this.$emit('query');
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  margin-bottom: -18px;

  &.has-group {
    position: relative;
    padding-right: 305px;
    min-height: 60px;
  }

  .fixed {
    position: absolute;
    top: 1px;
    right: -$size-small;
  }

  .full {
    width: 100%;
  }
}
</style>
