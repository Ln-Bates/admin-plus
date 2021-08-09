<template>
  <div class="view-container">
    <div
      :class="{'has-footer': hasFooter}"
      class="content-container"
    >
      <slot />
    </div>
    <div
      v-if="hasFooter"
      class="footer-bar"
    >
      <slot name="footer-bar" />
    </div>
    <slot name="popup" />
  </div>
</template>

<script>
export default {
  computed: {
    hasFooter() {
      return !!this.$slots['footer-bar'];
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';

.simple-view {
  border-radius: $radius;
  background: #fff;
}
</style>
