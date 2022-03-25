<template>
  <div class="category">
    <aside>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(item, index) in allData"
          :key="index"
          hide-timestamp
        >
          <span
            :class="currentTag === item.labelId ? 'active' : ''"
            @click="clickTagHandle(item.labelId, index)"
          >
            {{ item.label }} （{{ item.momentList.length }}）
          </span>
        </el-timeline-item>
      </el-timeline>
    </aside>
    <article>
      <el-timeline>
        <el-timeline-item
          v-for="item in articleList"
          :timestamp="item.createTime"
          :key="item.uid"
          placement="top"
        >
          <el-card>
            <h4 @click="toArticleDetailHandle(item.id)">
              {{ item.title }}
            </h4>

            <p v-html="item.content"></p>
            <ul>
              <!--    作者        -->
              <li class="author">
                <svg-icon icon-class="author"></svg-icon>
                <span>{{ item.author.name }}</span>
              </li>

              <!--    创建时间        -->
              <li class="createTime">
                <svg-icon icon-class="clock"></svg-icon>
                <span>{{ item.createTime | dateStrFormat }}</span>
              </li>
            </ul>
          </el-card>
        </el-timeline-item>

        <p class="noMoreTip">没有更多</p>
      </el-timeline>
    </article>
  </div>
</template>

<script>
import { getSortedMomentListApi } from "../../api/moment/index";
export default {
  name: "Category",
  data() {
    return {
      allData: {},
      currentTag: "",
      reverse: true,
      articleList: [],
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      const result = await getSortedMomentListApi();
      this.allData = result.data;

      // 初始化
      this.currentTag = this.allData[0].labelId;
      this.articleList = this.allData[0].momentList;

      console.log(this.allData);
    },

    clickTagHandle(id, index) {
      this.currentTag = id;
      this.articleList = this.allData[index].momentList;
    },
    toArticleDetailHandle(momentId) {
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
@import "Category";
</style>