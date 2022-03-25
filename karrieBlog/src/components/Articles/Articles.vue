<template>
  <div class="articles">
    <article v-for="item in blogList" :key="item.uid">
      <h3 @click="toArticleDetailHandle(item.id)">{{ item.title }}</h3>
      <div class="info-box">
        <!--    摘要      -->
        <p v-html="item.content"></p>

        <ul>
          <!--    作者        -->
          <li class="author" v-if="item.author.name">
            <svg-icon icon-class="author"></svg-icon>
            <span>{{ item.author.name }}</span>
          </li>

          <!--    创建时间        -->
          <li class="createTime">
            <svg-icon icon-class="clock"></svg-icon>
            <span>{{ item.createTime | dateStrFormat }}</span>
          </li>

          <!--    创建时间        -->
          <li class="comentCount">
            <svg-icon icon-class="comment"></svg-icon>
            <span>{{ item.comentCount }}</span>
          </li>
        </ul>
      </div>
    </article>

    <div v-if="hasMore" class="load-more-container">
      <el-button
        @click="loadMoreHandle"
        type="primary"
        :loading="isShowLoading"
      >
        查看更多
      </el-button>
    </div>

    <div v-else class="no-more-container">
      <el-button type="info" disabled>已加载全部博客</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    blogList: {
      type: Array,
      default: () => [],
    },
    isShowLoading: false, // 当用户点击查看更多的时候，把按钮转变为加载形态
  },
  data() {
    return {};
  },
  computed: {
    // 判断当前数组的长度和总的博客数量大小关系
    hasMore() {
      return this.blogList.length < this.total;
    },
  },
  methods: {
    // 把momentId传给父组件
    toArticleDetailHandle(momentId) {
      this.$emit("toArticleDetailHandle", momentId);
    },
    loadMoreHandle() {
      this.$emit("loadMoreHandle");
    },
  },
  filters: {
    // 格式化时间字符串
    dateStrFormat(time) {
      let dt = new Date(time);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}.${m}.${d} ${hh}:${mm}:${ss}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Articles";
</style>