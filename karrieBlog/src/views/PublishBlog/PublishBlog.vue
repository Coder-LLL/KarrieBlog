<template>
  <div class="publish-blog">
    <el-tabs v-model="activeName" type="card" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home">网站首页</el-tab-pane>
      <el-tab-pane label="创建博客" name="publishBlog">
        <el-form
          :model="addBlogForm"
          :rules="addBlogRules"
          ref="addBlogRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="addBlogForm.title"></el-input>
          </el-form-item>

          <el-form-item label="文章标签" prop="label">
            <el-checkbox-group v-model="addBlogForm.label" @change="change">
              <el-checkbox
                v-for="label in allLabel"
                :key="label.id"
                :label="label.name"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="内容" prop="detail">
            <editor-bar
              v-model="addBlogForm.detail"
              :isClear="isClear"
              @change="change"
            ></editor-bar>
          </el-form-item>

          <el-form-item class="submitBtnDiv">
            <el-button type="primary" @click="submitForm('addBlogRef')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('addBlogRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EditorBar from "../../components/wangEnduit/index.vue";
import { createMoment, createLabelForMoment } from "../../api/moment/index";
import { getAllLabel } from "../../api/label/index";
export default {
  name: "Category",
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
      activeName: "publishBlog",
      isClear: false,
      // detail: "",
      addBlogForm: {
        title: "",
        label: [],
        detail: "",
      },
      addBlogRules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        label: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "change",
          },
        ],
        detail: [
          { required: true, validator: validateDetail, trigger: "blur" },
        ],
      },
      allLabel: [],
    };
  },
  mounted() {
    this.getAllLabel();
  },
  methods: {
    async getAllLabel() {
      const result = await getAllLabel();
      this.allLabel = result.data;
    },
    change(val) {
      // console.log(val);
      // console.log(this.detail);
    },
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === "home") {
        this.$router.push("/");
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let content = this.addBlogForm.detail;
          let title = this.addBlogForm.title;
          const createMomentResult = await createMoment({
            title: title,
            content: content,
          });
          // 拿到momentId
          const momentId = createMomentResult.data.insertId;
          const createLabelForMomentResult = await createLabelForMoment(
            momentId,
            {
              labels: this.addBlogForm.label,
            }
          );
          this.$refs[formName].resetFields();
          this.$message({
            message: "发布成功",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "PublishBlog";
</style>