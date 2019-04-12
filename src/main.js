import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import './assets/styles/base.css';
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.debug = true;//开启错误提示
Es6Promise.polyfill();
new Vue({
    router,
    el: '#appIndex',
    render: h => h(App)
});