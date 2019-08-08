<template>
  <div>
    home
    <el-button @click="topBar"></el-button>
    <el-select v-model="value">
      <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import api from '@/api/api.js'
export default {
  data(){
    return {
      datas:{},
      list:[],
      value:null
    }
  },
  methods:{
    topBar(){
      api.getBarData().then(res=>{
        this.list = res.data;
        console.log(res);
      })
    }
  }
}
</script>

<style lang="scss">

</style>
