<template>
    <div class="header">
        <div class="container">
            <date-show v-model="inDateNum">
                服务器时间：
            </date-show>
            <a href="/">
                <img class="logo"
                     src="../assets/imgs/logotext.png">
            </a>
            <nav-title :navTitles="navTitles"
                       :navSrcs="navSrcs"
                       :navNow="navNow"></nav-title>
        </div>
    </div>
</template>

<style>
    .header{
        height: 55px;
        background: #fff;
        box-shadow: 0 1px 8px rgba(0,0,0,.08);
        padding-top: 20px;
        margin-bottom: 10px;
    }
    img.logo{
        display: inline-block;
        float: left;
        margin-top: 8px;
        margin-left: 25px;
        height: 30px;
    }
    .dateshow{
        display: inline-block;
        color: #2c3e50;
        float: right;
        margin: 10px 5px 10px 5px;
    }
    @media screen and (max-width:680px){
        .header{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 15px 0 !important;
            margin-bottom: 0;
            z-index: 9999;
            height: 32px;
        }
        img.logo{
            float: none;
            margin-left: 0;
            margin-top: 0;
        }
    }
    @media screen and (max-width: 1020px){
        .dateshow{
            display: none;
        }
    }
    @media screen and (min-width: 1021px) and (max-width:1235px){

    }
    @media screen and (min-width: 681px) and (max-width:1235px) {

    }
</style>

<script>
    import NavTitle from '../components/nav.vue';
    import DateShow from '../lpart/date.vue';
    export default {
        props:{
            webName: String,
        },
        data:function () {
            return {
                navTitles:['首页', '资源', '文档', '关于', '友情链接'],
                navSrcs:['/', '/file', '/blog', '/about', '/t'],
                navNow: 0,
                inDateNum: new Date().getTime(),
            }
        },
        components: {
            NavTitle,
            DateShow
        },
        methods: {
            // 获取当前服务器时间
            getTime: function (callback) {
                let xhr = null;
                xhr = new window.XMLHttpRequest();
                xhr.open("get","/");
                xhr.send(null);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200){
                            callback(xhr);
                        }
                    }
                }
            },

            // 当前页面位置
            getNavNow: function () {
                let urlHash = window.location.hash;
                if(urlHash === "#/" || urlHash === ""){
                    return 0;
                }else {
                    for(let i = 1;i < this.navSrcs.length;i++){
                        if(urlHash.search(this.navSrcs[i]) !== -1){
                            return i;
                        }
                    }
                    return 0;
                }
            }
        },
        created: function () {
            let _this = this;
            _this.navNow = _this.getNavNow();
            // 时间设置
            _this.getTime(
                function (ajax) {
                    _this.inDateNum=new Date(ajax.getResponseHeader('Date')).getTime();
                }
            );
            setInterval(function(){
                _this.inDateNum += 1000;
            },1000);
        }
    }
</script>