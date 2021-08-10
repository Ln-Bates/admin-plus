<template>
  <div>
    <div
      v-for="(item) in menuList"
      :key="item.path"
    >
      <template v-if="showItem(item)">
        <el-submenu
          v-if="item.children"
          :index="item.path"
        >
          <template slot="title">
            <span>{{item.meta.title}}</span>
          </template>
          <menu-item :routes="item.children" />
        </el-submenu>
        <el-menu-item
          v-else
          :index="item.path"
        >
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'menu-item',
  props: ['routes'],
  computed: {
    menuList() {
      return this.routes;
    }
  },
  methods: {
    showItem(item) {
      if (!item.meta) return true;
      if (item.meta && item.meta.hide) return false;
      return true;
    }
  }
};
</script>

<style>
</style>
