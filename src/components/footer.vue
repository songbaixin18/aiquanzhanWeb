<template>
    <div class="footer">
        <div class="footer_desc">
            {{myselfDesc}}
            <a target="blank" href="https://www.songbaixin.cn">了解我</a>
        </div>
        <div class="footer_text">
            © 2018 <a target="_self" href="http://www.songbaixin.com">{{webName}}</a> - 备案号：{{ICP}}
        </div>
    </div>
</template>

<style>
    .footer{
        width: 100%;
    }
    .footer_desc{
        position: relative;
        text-align: center;
        padding: 70px 20px;
        color: #fafafa;
        background: #42b983;
        font-size: 1.5rem;
    }
    .footer_desc a{
        display: block;
        color: #fafafa;
        background-color: transparent;
        font-size: 1.1rem;
        line-height: 2.8rem;
        max-width: 10rem;
        margin: 1rem auto;
        border: #fafafa solid 1px;
        border-radius: 3px;
        -webkit-transition: color 0.25s, background-color 0.25s;
        -moz-transition: color 0.25s, background-color 0.25s;
        -ms-transition: color 0.25s, background-color 0.25s;
        -o-transition: color 0.25s, background-color 0.25s;
        transition: color 0.25s, background-color 0.25s;
    }
    .footer_desc a:hover{
        color: #5a5a5a;
        background-color: #fafafa;
        text-decoration: none;
    }
    .footer_text {
        color: #cccccc;
        font-size: 0.7rem;
        min-height: 100px;
        background: #fafafa;
        text-align: center;
        line-height: 100px;
    }
    .footer_text a{
        color: #acaea0;
        -webkit-transition: color 0.25s;
        -moz-transition: color 0.25s;
        -ms-transition: color 0.25s;
        -o-transition: color 0.25s;
        transition: color 0.25s;
    }
    .footer_text a:hover{
        color: #3c3e3f;
        text-decoration: none;
    }
</style>

<script>
    export default {
        props:{
            webName: String,
            ICP: String,
            myselfDesc: String
        },
        data:function() {
            return {
            }
        }
    }
</script>