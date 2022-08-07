<template>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="#545c65"
    >
      <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(n)" v-for="n in noChildren" :key="n.path" :index="n.path + ''">
        <i :class="`el-icon-${n.icon}`"></i>
        <span slot="title">{{ n.label }}</span>
      </el-menu-item>
      <el-submenu v-for="n in hasChildren" :key="n.path" :index="n.path + ''">
        <template slot="title">
          <i :class="`el-icon-${n.icon}`"></i>
          <span slot="title">{{ n.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="i in n.children"
            :key="i.path"
            :index="i.path + ''"
            @click="clickMenu(i)"
          >
            <i :class="`el-icon-${i.icon}`"></i>
            <span>{{ i.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    },
    clickMenu(n){
      this.$router.push({
        name:n.name
      })
      this.$store.commit('selectMenu',n)
    }
  },
  computed: {
    noChildren() { 
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    asyncMenu(){
      console.log(this.$store.state.tab.menu)
      return this.$store.state.tab.menu
    }
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu {
  height: 100%;
  border: none;
}
.el-menu h3 {
  color: #fff;
  text-align: center;
  line-height: 48px;
}
</style>