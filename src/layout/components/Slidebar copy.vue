<template>
  <el-menu router class="el-menu-vertical-demo" :default-active="'/'+$route.matched[1].name" text-color="#9bb0be" active-text-color="#3980cb" background-color="#304156" unique-opened >
    <el-menu-item index="/home">
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/loan-input">
      <span slot="title">贷款申请</span>
    </el-menu-item>
    <el-menu-item index="/input-manager">
      <span slot="title">申请管理</span>
    </el-menu-item>
    <el-submenu index="/loan-approve">
      <template slot="title">
        <span>贷款审批</span>
      </template>
      <el-menu-item index="/loan-approve/first">初审</el-menu-item>
      <el-menu-item index="/loan-approve/end">终审</el-menu-item>
    </el-submenu>
    <el-menu-item index="/contract">
      <span slot="title">标的管理</span>
    </el-menu-item>

    <el-submenu index="/permission">
      <template slot="title">
        <span>权限管理</span>
      </template>
      <el-menu-item index="/permission/create">创建管理员</el-menu-item>
      <el-menu-item index="/permission/list">列表展示</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name:"Slidebar"
}
</script>

<style scoped>
  .el-aside .el-menu {
    height: 100%;
    border-right: 0px;
  }
</style>