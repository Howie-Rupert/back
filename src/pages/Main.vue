<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <Tags />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/CommonAside.vue";
import Header from "../components/CommonHeader.vue";
import Tags from "../components/CommonTags.vue";
export default {
  name: "Main",
  data() {
    return {};
  },
  components: {
    Aside,
    Header,
    Tags
  },
};
</script>
<style>
.el-container{
  height: 100%;
}
.el-header {
  background-color: #2b2b2b;
}
.el-main {
  padding-top: 0;
}
</style>