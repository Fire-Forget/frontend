import api from "@/api/api.js"

const global = {
  state:{
    topBar:[],
  },
  mutations:{
    GET_TOP_BAR:(state,data)=>{
      state.topBar = data;
    }
  },
  actions:{
    getTopBar({
      commit
    },params, cb){
      console.log("getTopBar");
      api.getBarData().then(res=>{
        commit('GET_TOP_BAR',res.data || []);
      })
    }
  }
}

export default global;