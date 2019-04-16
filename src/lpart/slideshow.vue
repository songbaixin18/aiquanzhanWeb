<template>
    <div id="slideshow-div" class="slideshow-div">
        <transition-group tag="ul" class="slideshow" name="slideshow">
            <li v-for="(list, index) in slideList" :key="index" v-show="index === currentIndex" @mouseenter="stop" @mouseleave="start">
                <a :href="list.clickUrl">
                    <img :src="list.src" :alt="list.desc">
                </a>
            </li>
        </transition-group>
        <div class="slideshow_title">
            <span v-for="(list, index) in slideList.length" :class="{'active':index === currentIndex}" @mouseover="change(index)"></span>
        </div>
    </div>
</template>

<style>
    .slideshow-div {
        position: relative;
        height: 233px;
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        border-radius: 5px;
    }

    .slideshow {
        width: 100%;
        height: 100%;
    }
    .slideshow li {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .slideshow li img {
        width: 100%;
        height: 100%;
    }

    .slideshow_title {
        position: absolute;
        z-index: 10;
        top: 200px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        font-size: 0;
    }
    .slideshow_title span {
        display: inline-block;
        height: 6px;
        width: 30px;
        margin: 0 3px;
        background-color: #b2b2b2;
        cursor: pointer;
    }
    .slideshow_title .active {
        background-color: #000000;
    }
    .slideshow-enter-to {
        transition: all 1s ease;
        transform: translateX(0);
    }

    .slideshow-leave-active {
        transition: all 1s ease;
        transform: translateX(-100%)
    }

    .slideshow-enter {
        transform: translateX(100%)
    }

    .slideshow-leave {
        transform: translateX(0)
    }
</style>

<script>
    export default {
        data: function(){
            return {
                slideList: [
                    {
                        "clickUrl": "http://web.jobbole.com/94127/",
                        "desc": "Angular 和 Vue.js 深度对比",
                        "src": require('../assets/imgs/avv.png')
                    },
                    {
                        "clickUrl": "https://vuejs.org/",
                        "desc": "Vue.js",
                        "src": require('../assets/imgs/httpsvuejs.org.png')
                    },
                    {
                        "clickUrl": "https://blog.csdn.net/lishanleilixin/article/details/79360244",
                        "desc": "深入理解vue",
                        "src": require('../assets/imgs/s3.png')
                    }
                ],
                currentIndex: 0,
                timer: ''
            }
        },
        created: function(){
            // 在DOM加载完成后，下个tick中开始轮播
            this.$nextTick(() => {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 4000)
            })
        },
        methods:{
            start:function() {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 4000)
            },
            stop:function() {
                clearInterval(this.timer);
                this.timer = null
            },
            change:function(index) {
                this.currentIndex = index
            },
            autoPlay:function() {
                this.currentIndex++;
                if (this.currentIndex > this.slideList.length - 1) {
                    this.currentIndex = 0
                }
            }
        }
    }
</script>