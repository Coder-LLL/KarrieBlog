<template>
  <div class="follow-us">
    <h2>{{ title }}</h2>
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
        :style="{ border: `1px solid ${item.color}` }"
        @click="contactMeHandle(item)"
      >
        <span class="icon-box" :style="{ color: item.color }">
          <svg-icon :icon-class="item.icon"></svg-icon>
        </span>

        <span class="content">{{ item.content }}</span>
        <span class="label" :style="{ background: item.color }">
          {{ item.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FollowUs",
  props: {
    title: {
      type: String,
      default: "",
    },
    // list: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = [
      {
        id: "1",
        icon: "github",
        color: "#000000",
        label: "Github",
        content: "Coder-LLL",
        url: "https://github.com/Coder-LLL",
      },
      {
        uid: "2",
        icon: "gitee",
        color: "#E93B3C",
        label: "Gitee",
        content: "lei-zhonghui",
        url: "https://gitee.com/lei-zhonghui",
      },
      {
        uid: "2",
        icon: "csdn",
        color: "#FC5531",
        label: "CSDN",
        content: "Karrie",
        url: "https://blog.csdn.net/Lei190",
      },
    ];
  },
  methods: {
    contactMeHandle(item) {
      window.open(item.url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "FollowUs";
</style>