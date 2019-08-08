<template>
  <el-container>
    <el-header class="no-padding">
      <top-bar :topBar="topBar"/>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import TopBar from './topBar'
import { mapState } from 'vuex'
export default {
  components:{
    'top-bar':TopBar
  },
  data(){
    return {
      msg:"layout"
    };
  },

  beforeCreate(){
    this.$store.dispatch('getTopBar');
  },

  computed: mapState({
    topBar: state => state.global.topBar,
  }),
}
</script>

<style lang="scss">
  
</style>