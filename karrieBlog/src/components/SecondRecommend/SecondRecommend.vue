<template>
  <div class="second-recommend">
    <ul>
      <li
        v-for="item in blogList"
        :key="item.id"
        @click="toArticleDetailHandle(item.id)"
      >
        <div class="mask"></div>
        <el-image
          style="width: 100%; height: 100%"
          :src="item.images[0] + '?type=small'"
          :alt="item.title"
        />
        <h2>{{ item.title }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SecondRecommend",
  data() {
    return {
      blogList: [
        {
          id: 1,
          title: "标题1",
          content: "了解真相，才能获得真正的自由！",
          createTime: "2020-11-23T14:05:23.000Z",
          updateTime: "2022-03-18T01:44:25.000Z",
          author: {
            id: 4,
            name: "lucy",
          },
          comentCount: 5,
          labelCount: 6,
          images: [
            "http://localhost:8000/moment/images/b003809b961e8b4895e84369c8ecfa21",
            "http://localhost:8000/moment/images/23767cb2a29c675123c627e775fdfccd",
          ],
          totalMomentsCount: 22,
        },
        {
          id: 2,
          title: "标题1",
          content: "了解真相，才能获得真正的自由！",
          createTime: "2020-11-23T14:05:23.000Z",
          updateTime: "2022-03-18T01:44:25.000Z",
          author: {
            id: 4,
            name: "lucy",
          },
          comentCount: 5,
          labelCount: 6,
          images: [
            "http://localhost:8000/moment/images/ce9e6194cbad3b78c2aa2ef2388b1211",
            "http://localhost:8000/moment/images/5d307d76f0bb3622ef8e76c646f38ebb",
          ],
          totalMomentsCount: 22,
        },
      ],
    };
  },
  methods: { toArticleDetailHandle(id) {} },
};
</script>

<style lang="scss" scoped>
@import "SecondRecommend";
</style>