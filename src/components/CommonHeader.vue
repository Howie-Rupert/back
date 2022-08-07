<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb style="margin-left:20px;color:red;" separator="/">
        <el-breadcrumb-item class="mytags" v-for="t in tags " :key="t.path" :to="{ path: t.path }">{{t.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/img/login.jpg"),
    };
  },
  methods:{
    handleMenu(){
      this.$store.commit('CollapseMenu')
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabsList
    })
  }
};
</script>

<style scoped>
header {
  display: flex;
  height: 100%;
  justify-content:space-between;
  align-items: center;
  flex-direction: row;
}
.l-content {
  display: flex;
  align-items: center;
}
.l-content.el-button{
    margin-right:20px;
}
.user{
  width:40px;
  height: 40px;
  border-radius: 50%;
}
.mytags /deep/ .el-breadcrumb__inner{
  color: rgb(197, 197, 197) ;
}
.mytags /deep/ .el-breadcrumb__inner.is-link {
  color: white ;
}
</style>