<template>
  <div
    v-loading="loading"
    class="view"
  >
    <div
      :class="{'has-footer': hasFooter}"
      class="view-content"
    >
      <el-scrollbar style="height: 100%;">
        <slot />
      </el-scrollbar>
    </div>
    <div
      v-if="hasFooter"
      class="view-footer"
    >
      <el-button
        v-if="showHandle"
        @click="handleCancel"
      >
        返回
      </el-button>
      <slot name="slot-footer" />
    </div>
    <slot name="popup" />
  </div>
</template>

<script>
export default {
  name: 'base-view',
  props: {
    showHandle: {
      type: Boolean,
      default: true
    },
    isRouter: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasFooter() {
      return !!this.$slots['slot-footer'] || this.showHandle;
    }
  },
  methods: {
    handleCancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
