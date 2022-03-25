<template>
  <div class="home">
    <main>
      <Carousel></Carousel>
      <Articles
        :total="totalMomentsCount"
        :blogList="momentList"
        @loadMoreHandle="loadMoreHandle"
        @toArticleDetailHandle="toArticleDetailHandle"
      ></Articles>
    </main>
    <aside>
      <SecondRecommend></SecondRecommend>
      <FollowUs title="关注我"></FollowUs>
    </aside>
  </div>
</template>

<script>
import Carousel from "../../components/Carousel/Carousel.vue";
import Articles from "../../components/Articles/Articles.vue";

import SecondRecommend from "../../components/SecondRecommend/SecondRecommend.vue";
import FollowUs from "../../components/FollowUs/FollowUs";
import { getMomentListApi } from "../../api/moment";
export default {
  name: "Home",
  components: {
    Carousel,
    Articles,
    SecondRecommend,
    FollowUs,
  },
  data() {
    return {
      momentList: [], // 文章列表
      totalMomentsCount: 0, // 文章列表总条数
      currentPage: 0,
      searchParam: {
        offset: 0, // 当前页
        size: 10, // 列表总条数
      },
    };
  },
  mounted() {
    this.getMomentList();
  },
  methods: {
    // 获取博客数据
    async getMomentList() {
      this.searchParam.offset = this.currentPage * 10;
      const result = await getMomentListApi(this.searchParam);
      this.momentList.push.apply(this.momentList, result.data);
      this.totalMomentsCount = this.momentList[0].totalMomentsCount;
    },
    // 加载更多
    loadMoreHandle() {
      this.currentPage++;
      this.getMomentList();
    },
    // 跳转到某个博客页面
    toArticleDetailHandle(momentId) {
      const routerData = this.$router.resolve({
        path: `/moment/${momentId}`,
      });
      window.open(routerData.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Home";
</style>