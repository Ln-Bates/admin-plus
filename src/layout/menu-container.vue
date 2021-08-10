<template>
  <el-menu
    :default-active="defaultActive"
    :router="true"
  >
    <menu-item :routes="routes" />
  </el-menu>
</template>

<script>
import { children } from '@/router/routes';
import MenuItem from './menu-item';

export default {
  components: {
    MenuItem
  },
  data() {
    return {
      routes: [],
      defaultActive: ''
    };
  },
  watch: {
    '$route.path'(path) {
      this.setActive(path);
    }
  },
  methods: {
    setActive(path) {
      this.defaultActive = path;
    },
    setRoutes(data) {
      const routes = JSON.parse(JSON.stringify(data));
      routes.forEach(item => {
        const children = item.children;
        if (children) {
          children.forEach(child => {
            if (child.path[0] !== '/') {
              let path = `${item.path}/${child.path}`;
              if (child.path === '') {
                path = item.path;
              }
              child.path = path;
            }
            if (child.children) {
              this.setRoutes(children);
            }
          });
        }
      });
      return routes;
    }
  },
  created() {
    this.routes = this.setRoutes(children);
  },
  mounted() {
    this.setActive(this.$route.path);
  }
};
</script>

<style>
</style>
