<template>
  <div class="top-bar">
    <div class="fl top-left">
      <router-link to="/home">
        <img :src="Logo" alt="logo" class="logo">
        <div class = "title fr">
          {{title}}
        </div>
      </router-link>
    </div>
    <div class="fl " style="height:59px">
      <el-menu 
        class="top-menu" 
        mode="horizontal" 
        :default-active="activeIndex"
      >
        <el-menu-item 
        v-for="item in topBar" 
        :key="item.id" 
        :index="item.url.match(/\/\w*/g)[0]">
        <!-- 上面的match 取/xxx/yyy中的/xxx -->
            {{item.name}}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
  
<script>

import Logo from "@/public/assets/img/logo.png";
export default {
  props:["topBar"],
  data(){
    return {
      Logo,
      title:'Welcome to Web of Fire & Forget',
      activeIndex:'',
    }
  },
  // computed:{
  //   activeIndex: ()=> this.$route.path.match(/\/\w*/g)[0]
  // }
}
</script>

<style lang="scss">
  .top-bar{
    height: 100%;
    padding: auto;
    border-bottom: 1px solid grey;
    .top-left{
      margin-left: 80px;
      margin-right: 50px;
      height: 100%;
      .logo{
      height: 50px;
      margin: 5px 0 5px;
      }
      .title{
        margin-left: 20px;
        vertical-align: middle;
        line-height: 60px;
        height: 100%;
        color:#409EFF;
        font-size: 25px;
      }
    }
    .top-menu{
      height: 59px;
    }
    
  }
</style>
