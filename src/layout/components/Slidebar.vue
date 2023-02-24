<template>
  <el-menu router class="el-menu-vertical-demo" :default-active="'/'+$route.matched[1].name" text-color="#9bb0be" active-text-color="#3980cb" background-color="#304156" unique-opened >
    <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem'

export default {
  name:"Slidebar",
  data () {
    return {
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
    ])
  },
  mounted() {
    console.log(this.permission_routes);
  },
}
</script>

<style scoped>
  .el-aside .el-menu {
    height: 100%;
    border-right: 0px;
  }
</style>