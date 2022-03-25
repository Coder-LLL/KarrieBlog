<template>
  <div class="moment">
    <el-tabs v-model="activeName" type="card" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home">网站首页</el-tab-pane>
      <el-tab-pane label="文章详情" name="comment">
        <ArticleAsideBtn @commentSvgClick="commentSvgClick"></ArticleAsideBtn>
        <!-- <main> -->
        <header>
          <!--     文章标题       -->
          <h2>{{ momentInfo.title }}</h2>

          <!--      文章作者信息、点击量、分类、点赞数      -->
          <ul>
            <!--    作者        -->
            <li class="author">
              <svg-icon icon-class="author"></svg-icon>
              <span>{{ authorInfo.name }}</span>
            </li>
            <!--    创建时间        -->
            <li class="createTime">
              <svg-icon icon-class="clock"></svg-icon>
              <span>{{ momentInfo.createTime | dateStrFormat }}</span>
            </li>
          </ul>

          <!--      标签      -->
          <div class="tags-box">
            <el-tag
              v-for="label in labelsList"
              type="warning"
              :key="label.id"
              @click="toArticleListHandle(label.id, 'blogTag')"
            >
              {{ label.name }}
            </el-tag>
          </div>
        </header>

        <article @click="showBigPic">
          <div v-html="momentInfo.content" v-highlight></div>
          <div class="momentImageList">
            <!-- <div :key="image.id"> -->
            <el-image
              v-for="image in imagesList"
              :key="image.id"
              :src="image"
            ></el-image>
            <!-- </div> -->
          </div>
        </article>

        <footer>
          <hr />
          <h3 ref="comment" style="margin-bottom: 20px">
            留言（{{ comments.length }}）
          </h3>
          <CommentBox :loginUserInfo="momentInfo"></CommentBox>

          <div class="comment-message-list">
            <CommentMessageList
              @newReply="getComment"
              :commentsList="comments"
            ></CommentMessageList>
          </div>
        </footer>
        <!-- </main> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ArticleAsideBtn from "../../components/ArticleAsideBtn/ArticleAsideBtn.vue";
import CommentMessageList from "../../components/CommentMessageList/CommentMessageList.vue";
import CommentBox from "../../components/CommentBox/CommentBox.vue";
import { getMomentByIdApi } from "../../api/moment/index.js";
import { getCommentByMomentId } from "../../api/comment/index.js";
export default {
  name: "Moment",
  components: {
    ArticleAsideBtn,
    CommentBox,
    CommentMessageList,
  },
  data() {
    return {
      momentId: 0,
      momentInfo: {},
      authorInfo: {},
      activeName: "comment",
      imagesList: [],
      labelsList: [],
      comments: [],
    };
  },
  created() {
    // 拿到momentId然后去后台获取数据
    let { momentId } = this.$route.params;
    this.momentId = momentId;
    this.getMoment();
    this.getComment();
  },
  methods: {
    async getMoment() {
      const result = await getMomentByIdApi(this.momentId);
      this.momentInfo = result.data;
      this.authorInfo = result.data.author;
      this.imagesList = result.data.images;
      this.labelsList = result.data.labels;
    },
    async getComment() {
      const result = await getCommentByMomentId({ momentId: this.momentId });
      this.comments = result.data;
    },
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === "home") {
        this.$router.push("/");
        return false;
      }
    },
    toArticleListHandle() {},
    showBigPic() {},
    commentSvgClick() {
      const commentBox = this.$refs["comment"];
      commentBox.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
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
@import "Moment";
</style>