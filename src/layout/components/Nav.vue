<template>
  <div class="header">
    <div class="breadcrumb">
      <i class="tubiao el-icon-s-unfold"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(v,i) in lists" :key="i">{{v.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧下拉 -->
    <div class="right-dropdown">
        <el-dropdown>
          <span class="el-dropdown-link">
            退出<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
export default {
  name:"Nav",
  data() {
    return {
      lists:[]
    }
  },
  methods: {
    getRouter(){
      console.log(this.$route.matched);
      this.lists = this.$route.matched.filter(v=>v.meta && v.meta.title)
    },
    logout(){
      this.$store.dispatch('Logout')
      .then(d=>{
        console.log(d);
        this.$router.push('/login');
      }).catch(error=>{
        console.log(error);
      })
    }
  },
  created(){
    this.getRouter();
  },
  watch: {
    $route(to,from){
      console.log(to);
      console.log(from);
      this.getRouter()
    }
  },
}
</script>

<style scoped>
  .header .breadcrumb {
    width: 50%;
    height: 60px;
    line-height: 60px;
    float: left;
  }
  .header .breadcrumb .tubiao{
    float: left;
    margin-right: 5px;
    width: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
  }
  .header .breadcrumb .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }
  .right-dropdown {
    float:right;
    line-height: 60px;
  }
</style>