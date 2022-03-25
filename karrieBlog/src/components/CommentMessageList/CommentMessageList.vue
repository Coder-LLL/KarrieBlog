<template>
  <div class="comment-messageList">
    <div v-if="commentsList.length === 0" class="empty-box">
      <!-- <svg-icon icon-class="empty"></svg-icon> -->
      <el-empty description="暂无评论"></el-empty>
    </div>
    <div v-else v-for="item in commentsList" :key="item.uid">
      <div class="message-container" v-if="item.comment_id === null">
        <div class="firstLevel">
          <div class="left-profile">
            <template v-if="item.author.avatar_url">
              <el-image :src="item.author.avatar_url" alt="用户头像" />
            </template>
            <template v-else>
              <svg-icon icon-class="user"></svg-icon>
            </template>
          </div>
          <div class="right-content">
            <div class="nick-name">
              <span class="name">{{ item.author.name }}</span>
              <span class="tip-time">{{ item.createAt | dateStrFormat }}</span>
              <span class="replyTip" @click="replyClick(item)">回复</span>
            </div>

            <div class="message">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="twoLevel">
          <div class="twoLevelContainer" v-for="i in commentsList" :key="i.uid">
            <div class="twoLevelItem" v-if="i.comment_id === item.id">
              <div class="left-profile">
                <template v-if="i.author.avatar_url">
                  <el-image :src="i.author.avatar_url" alt="用户头像" />
                </template>
                <template v-else>
                  <svg-icon icon-class="user"></svg-icon>
                </template>
              </div>
              <div class="right-content">
                <div class="nick-name">
                  <div>
                    <span class="nameOne">{{ i.author.name }}</span>
                    <span>回复</span>
                    <span class="nameTwo">{{ i.fatherCommentUser.name }}</span>
                  </div>
                  <span class="tip-time">{{ i.createAt | dateStrFormat }}</span>
                </div>

                <div class="message">
                  {{ i.content }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-divider></el-divider>
      </div>
    </div>
    <div class="replyInputDiv" v-if="replyDialogVisible">
      <div class="replyInputDivContainer">
        <div class="replyInputAvatar">
          <!-- <template v-if="item.author.avatar_url">
          <el-image :src="item.author.avatar_url" alt="用户头像" />
        </template>
        <template v-else>
          <svg-icon icon-class="user"></svg-icon>
        </template> -->
        </div>
        <el-input
          type="textarea"
          :rows="2"
          :placeholder="'回复：' + replyInfo.replyTo"
          v-model="replyInfo.replyContent"
          resize="none"
        >
        </el-input>
        <div class="sendReplyBtn">
          <el-button type="primary" @click="cancleReplyClick"
            >取消回复</el-button
          >
          <el-button type="primary" @click="sendReplyClick">发表回复</el-button>
        </div>
      </div>
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
import { replyComment } from "../../api/comment/index";
export default {
  name: "CommentMessageList",
  props: {
    // 父级组件传过来的评论列表
    commentsList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      replyInputDivShow: {},
      replyDialogVisible: false,
      replyInfo: {
        replyTo: "",
        replyContent: "",
        commentId: "",
        momentId: "",
      },
      dialogVisible: false,
    };
  },
  mounted() {
    console.log(this.commentsList);
    // this.commentsList.forEach((element) => {

    // });
  },
  computed: {
    isLogin() {
      if (!this.$store.state.user.userId) {
        return false;
      }
      return true;
    },
  },
  methods: {
    replyClick(item) {
      if (!this.isLogin) {
        this.dialogVisible = true;
      } else {
        console.log(item);
        this.replyDialogVisible = true;
        this.replyInfo.replyTo = item.author.name;
        this.replyInfo.commentId = item.id;
        this.replyInfo.momentId = item.moment_id;
        console.log(this.replyInfo);
      }
    },
    cancleReplyClick() {
      this.replyDialogVisible = false;
    },
    async sendReplyClick() {
      const result = await replyComment(this.replyInfo.commentId, {
        momentId: this.replyInfo.momentId,
        content: this.replyInfo.replyContent,
      });
      // 当发布了新的评论的时候，通知父组件重新获取评论数据
      this.$emit("newReply");
      this.replyDialogVisible = false;
      this.replyInfo.replyTo = "";
      this.replyInfo.commentId = "";
      this.replyInfo.momentId = "";
      this.replyInfo.replyContent = "";
      console.log(result);
    },
    goToLogin() {
      this.$router.push("/login");
      this.dialogVisible = false;
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
@import "CommentMessageList";
</style>