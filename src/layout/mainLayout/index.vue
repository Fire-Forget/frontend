<template>
  <el-container>
    <el-header class="no-padding">
      <top-bar/>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import TopBar from './topBar'
export default {
  components:{
    'top-bar':TopBar
  },
  data(){
    return {
      msg:"layout"
    };
  },


}
</script>

<style lang="scss">
  
</style>