<template>
  <div class="comment-box">
    <div class="top-box">
      <!-- 判断有无登陆，如果登录成功就显示头像 -->
      <div v-if="!isLogin" class="profile">
        <svg-icon icon-class="user"></svg-icon>
      </div>
      <div v-else class="profile">
        <el-image :src="avatarUrl" alt="头像" />
      </div>
      <!-- <div class="profile">
        <el-image src="http://localhost:8000/users/4/avatar" alt="头像" />
      </div> -->
      <!-- 评论输入框 -->
      <div class="input-box">
        <el-input
          type="textarea"
          placeholder="既然来了，那就留下些什么吧~"
          @focus="commentInputFocus"
          @input="commentInputHandle"
          v-model="commentContent"
          :maxlength="maxlength"
          :autosize="{ minRows: 6, maxRows: 6 }"
        />
      </div>
    </div>

    <div class="btns">
      <div class="available">还能输入{{ availableNum }}个字符</div>
      <div class="face-smile" v-if="availableNum > 1">
        <div @click="openEmojis">
          <svg-icon icon-class="smile" />
        </div>
        <ul v-if="isShowEmoji">
          <li
            v-for="(item, index) in faceList"
            :key="index"
            @click="insertEmoji(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="face-smile no-smile" v-else>
        <div>
          <svg-icon icon-class="no-smile" />
        </div>
      </div>
      <el-button type="info" @click="cancelMessageHandle">取消评论</el-button>
      <el-button type="primary" @click="sendMessageHandle">发送评论</el-button>
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
import faceList from "../../assets/emoji/emojis"; // 导入emoji表情
import { createComment } from "../../api/comment/index";
export default {
  name: "CommentBox",
  components: {},
  props: {
    loginUserInfo: {},
  },
  data() {
    return {
      faceList, // 存放emoji表情数据
      isShowEmoji: false,
      maxlength: 500, // 最多输入的字数
      commentContent: "",
      dialogVisible: false,
    };
  },
  computed: {
    // 用于统计剩余可输入的字数
    availableNum() {
      return this.maxlength - this.commentContent.length;
    },
    isLogin() {
      if (!this.$store.state.user.userId) {
        return false;
      }
      return true;
    },
    avatarUrl() {
      return (
        "http://localhost:8000/users/+" +
        this.$store.state.user.userId +
        "+/avatar"
      );
    },
  },
  methods: {
    // 取消发送按钮点击
    cancelMessageHandle() {
      this.commentContent = "";
    },
    commentInputFocus() {
      if (!this.isLogin) {
        this.dialogVisible = true;
      }
      console.log(this.isLogin);
    },
    commentInputHandle() {
      console.log(this.commentContent);
    },
    // 打开emoji表情面板
    openEmojis() {
      this.isShowEmoji = !this.isShowEmoji;
    },
    async sendMessageHandle() {
      const query = {
        momentId: this.loginUserInfo.id,
        content: this.commentContent,
      };
      const result = await createComment(query);
      console.log(result);
    },
    // 插入表情
    insertEmoji(emojiItem) {
      this.commentContent = this.commentContent + emojiItem;
      console.log(this.commentContent);
    },
    goToLogin() {
      this.$router.push("/login");
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "CommentBox";
</style>