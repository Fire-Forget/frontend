import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
//引入ElementUI组件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/public/assets/styles/index.scss'

import store from './store/index'   //状态管理
import plugin from './plugin/index'  //插件

Vue.config.productionTip = false

Vue.use(Element,{
  size:'small'  //set element-ui default size
})
Vue.use(plugin);
Vue.config.productionTip = false  //阻止显示生产模式的消息
new Vue({
  el:'#root',
  router,
  data:{

    
  },
  store,
  components:{
    App
  },
  template:'<App/>'

})





//热部署
if (module.hot) {
  module.hot.accept();
}