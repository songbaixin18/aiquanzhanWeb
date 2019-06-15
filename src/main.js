import './assets/styles/base.css';
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import VueResource from 'vue-resource'
Vue.use(VueResource);
// 开启错误提示
Vue.config.debug = true;
Es6Promise.polyfill();
new Vue({
    router,
    el: '#appIndex',
    render: h => h(App)
});