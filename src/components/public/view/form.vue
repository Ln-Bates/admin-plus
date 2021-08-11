<template>
  <base-view :show-handle="false">
    <el-form
      :inline="true"
      :model="val"
    >
      <template v-for="(group, index) in config">
        <div
          :key="index"
          class="form-group"
        >
          <el-divider
            v-if="group.title"
            content-position="left"
          >
            {{group.title}}
          </el-divider>
          <div
            v-for="(item, index) in group.list"
            :key="index"
            class="form-row"
          >
            <template v-if="Array.isArray(item)">
              <el-form-item
                v-for="row in item"
                :key="row.prop"
                :label="row.label"
              >
                <component
                  v-model="val"
                  :is="`form-${row.type}`"
                  :path="row.prop"
                />
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item :label="item.label">
                <component
                  v-model="val"
                  :is="`form-${item.type}`"
                  :path="item.prop"
                />
              </el-form-item>
            </template>
          </div>
        </div>
      </template>
    </el-form>
    <template #slot-footer>
      <template v-if="showDefaultHandle">
        <el-button>返回</el-button>
        <el-button type="primary">保存</el-button>
      </template>
      <template v-else>
        <slot name="slot-footer" />
      </template>
    </template>
    <template #popup>
      <slot name="#popup" />
    </template>
  </base-view>
</template>

<script>
import BaseView from 'public/view/base';
import TwoWay from 'mixins/two-way';
import FormCascader from 'public/form/cascader/index';
import FormCheckbox from 'public/form/checkbox/index';
import FormDate from 'public/form/date/index';
import FormInput from 'public/form/input/index';
import FormRadio from 'public/form/radio/index';
import FormSelect from 'public/form/select/index';
import FormSwitch from 'public/form/switch/index';

export default {
  components: {
    BaseView,
    FormCascader,
    FormCheckbox,
    FormDate,
    FormInput,
    FormRadio,
    FormSelect,
    FormSwitch
  },
  mixins: [TwoWay],
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showDefaultHandle() {
      return !this.$slots['slot-footer'];
    }
  },
  mounted() {
    console.log(this.config);
  }
};
</script>

<style>
</style>