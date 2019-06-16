import Vue from 'vue';
import Router from 'vue-router';
const homePage = () => import(/* webpackChunkName: 'homePage' */ './views/home.vue')
const aboutPage = () => import(/* webpackChunkName: 'aboutPage' */ './views/about.vue')
const editPage = () => import(/* webpackChunkName: 'editPage' */ './views/edit.vue')

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            component:homePage
        },
        {
            path:'/file',
            component:homePage
        },
        {
            path:'/blog',
            component:homePage
        },
        {
            path:'/about',
            component:aboutPage
        },
        {
            path:'/link',
            component:aboutPage
        },
        {
            path:'/edit',
            component:editPage
        }
    ]
})
