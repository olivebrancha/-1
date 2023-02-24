<template>
  <div class="list">
    <el-table :data="lists" style="width: 100%">
      <el-table-column  prop="account"  label="用户名"></el-table-column>
      <el-table-column  prop="password"  label="密码"></el-table-column>
      <el-table-column  prop="reg_time"  label="创建时间">
        <template slot-scope="{row}">
          <span>{{row.reg_time |getDate}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="creator"  label="创建者"></el-table-column>
      <el-table-column  prop="role_name"  label="权限分配">
        <template slot-scope="{row}">
          <span>{{row.role_name |getRole}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {permissionUserlist} from '@/api/article'
export default {
  name: 'input-manager',
  data () {
    return {
      lists: []
    }
  },
  filters: {
    getDate (time) {
      var d = new Date(time)
      var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return times
    },
    getRole (type) {
      switch (type) {
        case 'input':
          return '销售人员 '
        case 'approve':
          return '初审人员 '
        default:
          return type
      }
    }
  },
  methods: {
    getlist () {
      permissionUserlist().then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.lists = res.data
        }
      })
    }
  },
  created () {
    this.getlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list{
    margin-top: 20px;
  }
</style>
