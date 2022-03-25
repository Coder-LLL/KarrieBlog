<template>
  <div class="articleAsideBtn">
    <div class="feature-box">
      <el-badge value="评论" class="btn-box" @click.native="commentSvgClick">
        <svg-icon icon-class="comment" />
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleAsideBtn",
  methods: {
    commentSvgClick() {
      this.$emit("commentSvgClick");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "ArticleAsideBtn";
</style>