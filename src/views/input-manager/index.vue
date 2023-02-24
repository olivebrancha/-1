<template>
  <div class="input-manager">
    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="query.name"
                @input="getList()"></el-input>
    </div>
    <!-- 表格 -->
    <div class="input-manager-table">
      <el-table :data="lists"
                style="width: 100%">
        <el-table-column fixed
                         prop="name"
                         label="姓名"
                         align="center"></el-table-column>
        <el-table-column prop="birthday"
                         label="出生日期"
                         align="center">
          <template slot-scope='scope'>
            <span>
              {{scope.row.birthday |getBirthday}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         align="center">
          <template slot-scope='scope'>
            <span>
              {{scope.row.sex |getSex}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="education"
                         label="教育程度"
                         align="center">
          <template slot-scope='{row}'>
            <span>
              {{row.education |getEducation}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="address1"
                         label="居住地址"
                         align="center"></el-table-column>
        <el-table-column prop="mobile_phone"
                         label="手机号"
                         align="center"></el-table-column>
        <el-table-column prop="status"
                         label="申请状态"
                         align="center">
          <template slot-scope='{row}'>
            <el-tag :type="row.status |statusTypeFilter">{{row.status |statusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="300"
                         align="center">
          <template slot-scope="{row}">
            <el-button size="small"
                       type="primary"
                       @click="edit(row)"
                       :disabled="row.status==1||row.status==4||row.status>=5">编辑</el-button>
            <el-button size="small"
                       type="danger"
                       @click="del(row)"
                       :disabled="row.status==1||row.status==4||row.status>=5">删除</el-button>
            <el-button size="small"
                       type="success"
                       @click="SubmitToApprove(row)"
                       :disabled="row.status==1||row.status==4||row.status>=5">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="query.pageNo"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="query.pageSize"
                     :pager-count="5"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="rows">
      </el-pagination>

    </div>

    <!-- 编辑弹层 -->
    <el-dialog title="申请管理-编辑"
               :visible.sync="dialogEditVisible"
               center
               width="40%">
      <el-form :model="form">
        <el-form-item label="id"
                      :label-width="formLabelWidth"
                      v-show="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    class="filter-item"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      :label-width="formLabelWidth"
                      prop="sex">
          <el-select v-model="form.sex"
                     class="filter-item"
                     placeholder="Please select">
            <el-option v-for="item in sexOptions"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loanList, loanUpdate, loanDelete, loanSubmitToApprove } from '@/api/article';
//性别
const sexOptions = [
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
];
export default {
  name: 'input-manager',
  data () {
    return {
      lists: [], // 展示数据
      rows: 1, // 总条数
      pages: 1, // 总页数
      query: { // 请求数据
        pageNo: 1,
        pageSize: 10,
        name: ''
      },
      form: {
        id: '',
        name: '',
        sex: ''
      },
      formLabelWidth: '60px',
      sexOptions,
      dialogEditVisible: false, //编辑弹层
    }
  },
  methods: {
    getList () {
      loanList(this.query).then(res => {
        console.log("data", res);
        if (res?.data?.data) {
          this.lists = res.data.data.data
          this.rows = res.data.rows
          this.pages = res.data.pages
        } else {
          this.lists = [];
          this.rows = 0;
          this.pages = 0;
        }

      })
    },
    // 编辑数据的获取
    edit (row) {
      this.dialogEditVisible = true // 弹层显示
      this.form = Object.assign({}, row)
    },
    // 编辑提交数据
    update () {
      loanUpdate(this.form).then(res => {
        console.log(res);
        if (res.code === 20000) {
          this.dialogEditVisible = false // 弹层隐藏
          this.getList() // 重新调用查询
          this.form = {}
          this.$message({
            type: 'success',
            message: '编辑成功!',
            duration: 2000
          })
        }
      })
    },
    // 删除
    del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loanDelete({ id: row.id }).then(res => {
          console.log(res)
          if (res.code === 20000) {
            this.getList() // 重新调用查询接口
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交审核
    SubmitToApprove (row) {
      loanSubmitToApprove({ id: row.id }).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.getList() // 重新调用查询接口
          this.$message({
            type: 'success',
            message: '提交成功!',
            duration: 2000
          })
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getList()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getList()
      console.log(`当前页: ${val}`);
    }
  },
  filters: {
    getBirthday (data) {
      let myDate = new Date(data)
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let date = myDate.getDate()
      //日期时间处理
      function conver (s) {
        return s < 10 ? '0' + s : s;
      }
      let dates = year + '-' + conver(month) + "-" + conver(date)
      return dates
    },
    getSex (data) {
      switch (data) {
        case 'man':
          return '男'
        case 'woman':
          return '女'
        default:
          return data
      }
    },
    getEducation (data) {
      switch (data) {
        case 'college':
          return '大学'
        case 'highschool':
          return '高中'
        default:
          return data
      }
    },
    statusFilter (data) {
      switch (data) {
        case 0:
          return '进件状态'
        case 1:
          return '提交初审'
        case 2:
          return '初审通过'
        case 3:
          return '初审拒绝'
        case 4:
          return '提交终审'
        case 5:
          return '终审通过'
        case 6:
          return '终审拒绝'
        case 7:
          return '生成合同'
        default:
          return data
      }
    },
    statusTypeFilter (data) {
      switch (data) {
        case 0:
          return 'success'
        case 1:
          return ''
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'warning'
        case 5:
          return 'success'
        case 6:
          return 'danger'
        case 7:
          return 'success'
      }
    }
  },
  mounted () {
    this.getList()
  },
}
</script>

<style scoped>
.input-manager {
  margin-top: 20px;
}
.page {
  margin: 20px 0px;
  text-align: center;
}
.el-input,
.el-select {
  width: 100%;
}
</style>
