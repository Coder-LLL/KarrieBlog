<template>
  <div class="header-nav">
    <div class="logo-box">Karrie</div>
    <el-menu
      default-active="/home"
      router
      class="el-menu-demo"
      background-color="#181818"
      text-color="#bdbdbd"
      active-text-color="#00a7eb"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/category">分类</el-menu-item>
      <!-- <el-menu-item index="/publishBlog"> 发布博客 </el-menu-item> -->
    </el-menu>

    <!--  未登录时 默认显示一个未登录的小头像  -->
    <div v-if="!userId" class="user-unlogin">
      <el-dropdown>
        <span class="el-dropdown-link">
          <svg-icon icon-class="user"></svg-icon>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="width: 30px" @click.native="goToLogin"
            >登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else class="user-login">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-image :src="avatarUrl"></el-image>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            style="width: 100px"
            @click.native="showPersonalInformation"
          >
            个人信息
          </el-dropdown-item>
          <el-dropdown-item style="width: 100px" @click.native="loginOut">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="publishBlogDiv">
      <el-button type="primary" icon="el-icon-edit" @click="publishBlogBtnClick"
        >新建博客</el-button
      >
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>您还未登录，点击确定前往登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goToLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderNav",
  data() {
    return { dialogVisible: false };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转登录页面
    goToLogin() {
      this.$router.push({ path: "/login" });
    },
    // 退出登录
    loginOut() {
      this.$store.commit("user/loginOut");
    },
    // 跳转个人信息页面
    showPersonalInformation() {
      this.$router.push("/setting");
    },
    publishBlogBtnClick() {
      if (!this.$store.state.user.id) {
        this.dialogVisible = true;
        return;
      }
      this.$router.push({ path: "/publishBlog" });
    },
    goToLogin() {
      this.$router.push("/login");
      this.dialogVisible = false;
    },
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userName: (state) => state.user.userName,
      token: (state) => state.user.token,
    }),
    avatarUrl() {
      return "http://localhost:8000/users/+" + this.userId + "+/avatar";
    },
  },
};
</script>

<style scoped lang="scss">
@import "HeaderNav";
</style>
