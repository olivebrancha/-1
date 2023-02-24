<template>
  <div class="loan-approve-first">
    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="query.name" @input="getList()"></el-input>
    </div>
    <!-- 表格 -->
    <div class="input-manager-table">
      <el-table :data="lists" style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" align="left" ></el-table-column>
        <el-table-column prop="birthday" label="出生日期" align="left" >
          <template slot-scope='scope'>
            <span>
              {{scope.row.birthday |getBirthday}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="identity_card" label="身份证" align="left" ></el-table-column>
        <el-table-column label="操作" width="300" align="left" >
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="handleDetails(row)" >查看</el-button>
            <el-button size="small" type="success" @click="handlePass(row)" :disabled="row.result==='reject'|| row.result==='pass'" >通过</el-button>
            <el-button size="small" type="danger" @click="handleReject(row)" :disabled="row.result==='reject'|| row.result==='pass'" >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看详情弹层功能 -->
    <el-dialog title="贷款审批-查看详情" :visible.sync="dialogDetailsVisible" width="34%">
      <el-form :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="id">
          <el-input v-model="temp.id" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="temp.name" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input :value="temp.birthday |getDate" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input :value="temp.sex |getSex" readonly />
        </el-form-item>
        <el-form-item label="教育程度">
          <el-input :value="temp.education |getEducation" readonly />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input v-model="temp.address1" readonly/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model.number="temp.mobile_phone" readonly/>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="temp.identity_card" readonly/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailsVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rows">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {approveFirstList,loanQuery,approveFirstPass,approveFirstReject} from '@/api/article';
export default {
  name: 'loan-approve-first',
  data() {
    return {
      lists:[],
      rows:1, // 总条数
      pages:1, // 总页数
      query:{ // 请求数据
        pageNo:1, // 当前页码
        pageSize:10, // 当前页数
        name:''
      },
      temp:{ // 详情展示数据
        id: '',
        name: '', // 姓名
        birthday: '', // 出生日期
        sex: '', // 性别
        education: '', // 教育程度
        address1: '', // 居住地址
        mobile_phone: '' // 手机号
      },
      dialogDetailsVisible:false // 详情弹层
    }
  },
  methods: {
    getList () {
      approveFirstList(this.query).then(res => {
        console.log(res);
        if (res.code === 20000) {
          this.lists = res.data.data.data
          this.rows = res.data.data.rows
          this.pages = res.data.data.pages
        }
      })
    },
    // 查看详情
    handleDetails (row) {
      loanQuery({id:row.id}).then(res=>{
        console.log(res);
        if (res.code === 20000) {
          this.temp = res.data.data
          this.dialogDetailsVisible = true
        }
      })
    },
    // 通过功能
    handlePass (row) {
      console.log(row)
      this.$confirm('是否通过初审？', '贷款审批-初审', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        approveFirstPass({appId: row.id, loanId: row.id}).then(res => {
          if (res.code === 20000) {
            this.getList()
            this.$message({
              type: 'success',
              message: '通过初审',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          duration: 2000
        })
      })
    },
    // 拒绝功能
    handleReject (row) {
      this.$confirm('是否拒绝初审？', '贷款审批-拒绝', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        approveFirstReject({appId: row.id, loanId: row.id}).then(res => {
          if (res.code === 20000) {
            this.getList()
            this.$message({
              type: 'success',
              message: '初审拒绝',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          duration: 2000
        })
      })
    },
    // 当前条数变化
    handleSizeChange (val) {
      this.query.pageSize = val || this.query.pageSize
      this.getList() // 重新调用查询接口
    },
    // 当前页变化
    handleCurrentChange (val) {
      this.query.pageNo = val || this.query.pageNo
      this.getList() // 重新调用查询接口
    }
  },
  mounted() {
    this.getList()
  },
  filters:{
    getBirthday(data){
      let myDate = new Date(data)
      let year = myDate.getFullYear()
      let month = myDate.getMonth()+1
      let date = myDate.getDate()
      //日期时间处理
      function conver(s) {
        return s < 10 ? '0' + s : s;
      }
      let dates = year + '-' + conver(month) + "-" + conver(date) 
      return dates
    },
    getDate (time) {
      var d = new Date(time)
      var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return times
    },
    getSex (type) {
      switch (type) {
        case 'man':
          return '男'
        case 'woman':
          return '女'
        default:
          return type
      }
    },
    getEducation (type) {
      switch (type) {
        case 'highschool':
          return '高中'
        case 'college':
          return '大学'
        default:
          return type
      }
    }
  }
}
</script>

<style scoped>
  .loan-approve-first {
    margin-top: 20px;
  }
  .page {
    margin: 20px 0px;
    text-align: center;
  }
</style>
