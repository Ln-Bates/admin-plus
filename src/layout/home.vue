<template>
  <el-container class="outer-container">
    <el-aside width="200px">
      <menu-container />
    </el-aside>
    <el-container class="inner-container">
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuContainer from './menu-container';
export default {
  components: {
    MenuContainer
  }
};
</script>

<style>
.outer-container {
  height: 100%;
}
.inner-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  padding: 0;
  background-color: #e9eef3;
  color: #333;
}
</style>
