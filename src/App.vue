<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <header-tab :webName="webName"></header-tab>
        <div>
            <router-view v-if="isRouterAlive"/>
        </div>
        <footer-tab :webName="webName" :ICP="ICP" :myselfDesc="myselfDesc"></footer-tab>
    </div>
</template>
<style>
    #app {
        text-align: center;
        color: #2c3e50;
    }
    .container{
        position: relative;
        margin: 0 auto;
        max-width: 1176px;
        padding: 0;
    }
    @media screen and (max-width:680px){
        body{
            padding-top: 62px!important;
        }
    }
</style>

<script>
import HeaderTab from './components/header.vue';
import FooterTab from './components/footer.vue';
export default {
    data: function() {
        return{
            isRouterAlive: true,
            webName: '爱全栈',
            ICP: '黑ICP备17004506号-3',
            myselfDesc: '兴趣是最大的动力 但我反对996'
        }
    },
    methods: {
        reload: function () {
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
        }
    },
    watch: {
        '$route' (to, from) {
            this.reload();
        }
    },
    components:{
        HeaderTab,
        FooterTab
    }
}
</script>

