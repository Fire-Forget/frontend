import Vue from 'vue';
import Vuex from 'vuex';
//vuex.js需要在这里注册
import global from '@/pages/vuex';
// import getters  from './getters';

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    global,
  },
  getters :{
    topBar : state => state.global.topBar,
  }
})

export default store;