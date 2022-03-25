<template>
  <div class="login">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登陆" name="login">
          <el-form
            :model="loginForm"
            :rules="loginFormRules"
            ref="loginFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="loginForm.name"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                show-password
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button type="primary" @click="loginClick">登陆</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            :rules="registerFormRules"
            ref="registerFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="registerForm.name"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                show-password
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPassword">
              <el-input
                type="password"
                v-model="registerForm.checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button type="primary" @click="registerClick">注册</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { login, register } from "../../api/user/index";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerFormRef.validateField("checkPassword");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "login",
      registerForm: {
        name: "",
        password: "",
        checkPassword: "",
      },
      registerFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },

      loginForm: {
        name: "lucy",
        password: "123456",
      },
      loginFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    registerClick() {
      this.$refs["registerFormRef"].validate(async (valid) => {
        if (valid) {
          const result = await register({
            name: this.registerForm.name,
            password: this.registerForm.password,
          });
          this.$notify({
            title: "成功",
            message: "注册成功，请登录",
            type: "success",
          });
          this.activeName = "login";
          this.$refs["registerFormRef"].resetFields();
          console.log(result);
        } else {
          return false;
        }
      });
    },
    loginClick() {
      this.$refs["loginFormRef"].validate(async (valid) => {
        if (valid) {
          // const result = await login(this.loginForm);
          // console.log(result);
          this.$store.dispatch("user/login", this.loginForm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Login";
</style>