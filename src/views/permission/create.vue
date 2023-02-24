<template>
  <div class="create">
    <div class="create-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限分配" prop="role_id">
        <el-radio-group v-model="ruleForm.role_id">
          <el-radio label="2">销售人员</el-radio>
          <el-radio label="1">初审人员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">创建管理员</el-button>
        <el-button @click="resetFields('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import {permissionCreateUser} from '@/api/article'
export default {
  name: 'Create',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: '',
        password2: '',
        role_id: '2'
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass2}
        ],
        role_id: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      }
    }
  },
   methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var temp = {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            role_id: this.ruleForm.role_id
          }
          permissionCreateUser(temp).then(res => {
            console.log(res)
            if (res.code === 20000) {
              this.$router.push('/permission/list') // 跳转到申请管理
              this.$message({
                title: '创建成功',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetFields (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .create {
    margin-top: 20px;
  }
  .create-form {
    width: 50%;
  }
</style>
