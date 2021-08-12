<template>
  <base-view
    :show-handle="false"
    :loading="loading"
  >
    <el-form
      :inline="true"
      :model="val"
      :rules="rules"
      ref="hook-form"
    >
      <template v-for="(group, index) in options">
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
                :prop="getProp(row.prop)"
              >
                <component
                  v-model="val"
                  :is="`form-${row.type}`"
                  :path="row.prop"
                />
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item
                :label="item.label"
                :prop="getProp(item.prop)"
              >
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
        <el-button @click="$router.back()">返回</el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >
          保存
        </el-button>
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
import Form from 'public/form';

export default {
  components: {
    BaseView
  },
  mixins: [Form],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    request: {
      type: Function
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    showDefaultHandle() {
      return !this.$slots['slot-footer'];
    }
  },
  methods: {
    /**
     * 获取表单prop
     * path {String} prop路径
     */
    getProp(path) {
      if (!path) return '';
      const pathArr = path.split('.');
      return pathArr[pathArr.length - 1];
    },
    handleRequest() {
      this.loading = true;
      this.request().finally(() => {
        this.loading = false;
      });
    },
    handleSave() {
      const r = this.rules;
      if (r && Object.keys(r).length) {
        this.$refs['hook-form'].validate(field => {
          if (field) {
            this.handleRequest();
          }
        });
      } else {
        this.handleRequest();
      }
    }
  }
};
</script>

<style>
</style>