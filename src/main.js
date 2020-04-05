import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入element插件
import ElementUI from 'element-ui';
// 导入样式表
import 'element-ui/lib/theme-chalk/index.css';


import router from '@/router/router';

// 实例化组件
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
