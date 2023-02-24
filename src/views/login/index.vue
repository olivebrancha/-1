<template>
  <div class="login-container">
    <div class="login">
      <h2>信贷管理系统</h2>
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item label="" prop="account">
          <el-input prefix-icon="el-icon-user-solid" class="login-input-text" v-model="loginForm.account" placeholder="admin" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="el-icon-s-cooperation"  class="login-input-text" type="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      loginForm:{
        account:'admin',
        password:'approve123456.'
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          {}
        ],
      }
    }
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Login',this.loginForm)
            .then(d=>{
              console.log("login",d);
              this.$router.push('/home');
            }).catch(error=>{
              console.log(error);
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/loginbg.jpg') center center no-repeat;
  }
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    background: #fff;
    width: 30%;
    padding:60px 40px;
  }
  .login h2 {
    text-align: center;
    margin-bottom: 40px;
  }
  .el-button {
    width: 100%;
  }
  .login-input-text >>> .el-input__inner {
    background-color: #e5e5e5;
  }
  .login-input-text >>> .el-input__prefix,
  .login-input-text >>> .el-input__suffix {
    color: #606266;
  }
</style>
