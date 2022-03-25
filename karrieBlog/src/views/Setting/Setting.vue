<template>
  <div class="setting">
    <el-tabs v-model="activeName" type="card" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home">网站首页</el-tab-pane>
      <el-tab-pane label="个人详情" name="selfInfo" class="outerPane">
        <div class="baseInfoDiv">
          <div class="nick-name">
            <span class="nameTip">用户名：</span>
            <span class="name">{{ userName }}</span>
          </div>
          <div class="userImg">
            <span class="avatarTip">头像：</span>

            <el-tooltip
              class="item"
              effect="dark"
              content="点击查看大图"
              placement="right"
            >
              <el-image :src="avatarUrl" @click="avatarClick"></el-image>
            </el-tooltip>
          </div>
          <div class="avatarUpload">
            <el-form :model="form">
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://localhost:8080/upload/avatar"
                  :file-list="fileList"
                  :on-change="handleChange"
                  :auto-upload="false"
                  list-type="picture"
                  accept="image/png,image/gif,image/jpg,image/jpeg"
                >
                  <el-button slot="trigger" size="small" type="primary">
                    更新头像
                  </el-button>
                  <el-button
                    style="margin-left: 10px"
                    size="small"
                    type="success"
                    @click="submitUpload"
                    >上传</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div>
          <el-tabs v-model="contentManage" @tab-click="handleClick">
            <el-tab-pane label="我的发布" name="myMoment" class="innerPane">
              <article v-for="item in momentList" :key="item.id">
                <el-card>
                  <div class="info-box">
                    <div class="editAndDeleteBtnDiv">
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="modifyMomentByMomentId(item)"
                      ></el-button>
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-delete"
                        @click="deleteMomentByMomentId(item.id)"
                      ></el-button>
                    </div>
                    <h3>{{ item.title }}</h3>
                    <!--    摘要      -->
                    <p class="content" v-html="item.content"></p>

                    <ul>
                      <!--    创建时间        -->
                      <li class="createTime">
                        <svg-icon icon-class="clock"></svg-icon>
                        <span>{{ item.createAt | dateStrFormat }}</span>
                      </li>
                    </ul>
                  </div>
                </el-card>
              </article>
            </el-tab-pane>
            <el-tab-pane label="我的评论" name="myComment" class="innerPane">
              <article v-for="item in commentList" :key="item.id">
                <el-card>
                  <div class="info-box">
                    <div class="editAndDeleteBtnDiv">
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="modifyCommentByCommentId(item)"
                      ></el-button>
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-delete"
                        @click="deleteCommentByCommentId(item.id)"
                      ></el-button>

                      <el-button
                        @click="goToMoment(item.moment_id)"
                        size="mini"
                        type="success"
                        >跳转原文</el-button
                      >
                    </div>
                    <!--    摘要      -->
                    <p class="content" v-html="item.content"></p>

                    <ul>
                      <!--    创建时间        -->
                      <li class="createTime">
                        <svg-icon icon-class="clock"></svg-icon>
                        <span>{{ item.createAt | dateStrFormat }}</span>
                      </li>
                    </ul>
                  </div>
                </el-card>
              </article>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 文章编辑框 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="80%">
      <el-form
        :model="editItem"
        :rules="editRules"
        ref="editBlogRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题名称" prop="title">
          <el-input v-model="editItem.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="detail">
          <editor-bar v-model="editItem.detail" :isClear="isClear"></editor-bar>
        </el-form-item>

        <el-form-item class="submitBtnDiv">
          <el-button type="primary" @click="submitForm('editBlogRef')"
            >提交修改</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>

    <!-- 评论编辑框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editCommentDialogVisible"
      width="30%"
    >
      <el-form
        :model="editCommentItem"
        :rules="editCommentRules"
        ref="editCommentRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="评论内容" prop="content">
          <el-input v-model="editCommentItem.content"></el-input>
        </el-form-item>

        <el-form-item class="submitBtnDiv">
          <el-button type="primary" @click="submitCommentForm('editCommentRef')"
            >提交修改</el-button
          >
          <el-button @click="resetCommentForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteMoment, modyfiMoment } from "../../api/moment/index";
import { modifyCommentById, deleteCommentById } from "../../api/comment/index";

import EditorBar from "../../components/wangEnduit/index.vue";
import {
  avatarUpload,
  getPersonalMoment,
  getPersonalComment,
} from "../../api/user/index";
export default {
  name: "Setting",
  components: { EditorBar },
  data() {
    var validateDetail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入内容"));
      } else {
        callback();
      }
    };
    return {
      form: {
        file: "",
      },
      activeName: "selfInfo",
      contentManage: "myComment",
      fileList: [],

      momentList: [],
      commentList: [],

      isClear: false,
      editItem: {
        detail: "",
        title: "",
      },
      editItemCopy: { content: "", title: "" },
      editDialogVisible: false,
      editRules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        detail: [
          { required: true, validator: validateDetail, trigger: "blur" },
        ],
      },

      editCommentDialogVisible: false,
      editCommentItem: {
        content: "",
        commentId: "",
      },
      editCommentItemCopy: {
        content: "",
        commentId: "",
      },
      editCommentRules: {
        content: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getMoment();
    this.getComment();
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
  methods: {
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === "home") {
        this.$router.push("/");
        return false;
      }
    },
    async submitUpload() {
      let formData = new FormData();
      formData.append("avatar", this.form.file);
      const result = await avatarUpload(formData);
      location.reload();
    },
    handleChange(file) {
      this.form.file = file.raw;
    },
    avatarClick() {
      window.open(this.avatarUrl);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async getMoment() {
      const result = await getPersonalMoment(this.userId);
      this.momentList = result.data;
    },
    async getComment() {
      const result = await getPersonalComment(this.userId);
      this.commentList = result.data;
    },
    async deleteMomentByMomentId(momentId) {
      this.$confirm("此操作将永久删除文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteMoment(momentId);
          console.log(result);
          this.getMoment();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    modifyMomentByMomentId(item) {
      this.editDialogVisible = true;
      this.editItem = {
        detail: item.content,
        title: item.title,
        momentId: item.id,
      };
      this.editItemCopy = {
        detail: item.content,
        title: item.title,
        momentId: item.id,
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let content = this.editItem.detail;
          let title = this.editItem.title;
          let momentId = this.editItem.momentId;
          const result = await modyfiMoment(
            {
              title: title,
              content: content,
            },
            momentId
          );
          // 更新完毕重新获取一下数据，并且把编辑框关闭
          this.getMoment();
          this.editDialogVisible = false;
          console.log(result);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.editItem = {
        title: this.editItemCopy.title,
        detail: this.editItemCopy.detail,
        momentId: this.editItemCopy.id,
      };
    },

    resetCommentForm() {
      this.editCommentItem = {
        content: this.editCommentItemCopy.content,
        commentId: this.editCommentItemCopy.id,
      };
    },
    submitCommentForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let content = this.editCommentItem.content;
          let commentId = this.editCommentItem.commentId;
          const result = await modifyCommentById(
            {
              content: content,
            },
            commentId
          );
          // 更新完毕重新获取一下数据，并且把编辑框关闭
          this.getComment();
          this.editCommentDialogVisible = false;
          console.log(result);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    modifyCommentByCommentId(item) {
      this.editCommentDialogVisible = true;
      this.editCommentItem = {
        content: item.content,
        commentId: item.id,
      };
      this.editCommentItemCopy = {
        content: item.content,
        commentId: item.id,
      };
    },
    deleteCommentByCommentId(commentId) {
      this.$confirm("此操作将永久删除评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteCommentById(commentId);
          this.getComment();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    goToMoment(momentId) {
      const routerData = this.$router.resolve({
        path: `/moment/${momentId}`,
      });
      window.open(routerData.href, "_blank");
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
@import "Setting";
</style>