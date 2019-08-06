<template>
  <div>
    <img class="error-404" :src="page404" alt="404">
    <div style="text-align:center;">
      查看页面不存在，
      <span class="back-tip" @click="redirct">返回</span>
    </div>
  </div>
</template>

<script>
import page404 from '../../public/assets/img/404.jpeg'
export default {
  data() {
    return {
      page404
    };
  },
  methods: {
    redirct() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.error-404 {
  margin: 120px auto 60px;
  display: block;
  height: 230px;
}
.back-tip {
  cursor: pointer;
  text-align: center;
  color: #2482d2;
}
</style>
