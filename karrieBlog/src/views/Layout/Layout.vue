<template>
  <div class="layout">
    <el-container>
      <el-header><HeaderNav></HeaderNav></el-header>
      <el-main> <router-view /></el-main>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav/HeaderNav.vue";
import Footer from "../../components/FooterNav/Footer.vue";
export default {
  name: "layout",
  components: { HeaderNav, Footer },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "Layout";
</style>