<template>
    <div class="container">
        <div class="content-wrap">
            <slide-show></slide-show>
            <ul class="article_ul" v-if="article_lists !== 'error'">
                <li class="article_li" v-for="article_list in article_lists">
                    <a :href="article_list.src" class="article_thumbnail">
                        <img :src="article_list.thumbnail" :alt="article_list.description">
                    </a>
                    <div class="article_list_title">
                        <a class="article_type" href="http://www.songbaixin.xin/#/blog" v-if="article_list.type === 1">
                            <span>文档</span>
                        </a>
                        <a class="article_type" href="http://www.songbaixin.xin/#/file" v-if="article_list.type === 2">
                            <span>资源</span>
                        </a>
                        <a class="article_title" :href="article_list.src">
                            <h2>{{article_list.title}}</h2>
                        </a>
                    </div>
                    <p class="mate">
                        <span><i class="iconfont icon-wo"></i> {{article_list.date}}</span>
                        <span>{{article_list.author}}</span>
                        <span>阅读({{article_list.read_number}})</span>
                    </p>
                    <p class="description">
                        {{article_list.description}}
                    </p>
                </li>
            </ul>
            <div class="article_error" v-if="article_lists === 'error'">
                有哪里出现了问题才会导致文章列表请求失败呢，如果你没改动请求地址的话，应该是服务器吧...
            </div>
            <pagination :page_num="page_num" :page_sum="page_sum" :article_type="article_type" :request_url="request_url" @toPage="toPage"></pagination>
        </div>
    </div>
</template>
<style>
    @import "//at.alicdn.com/t/font_1040251_d9i8yescvbr.css";
    .content-wrap {
        margin-right: 400px;
        border: solid 1px rgba(0,0,0,0.05);
        border-radius: 5px;
    }

    .article_ul {
        width: 100%;
        text-align: left;
    }

    .article_li {
        width: 100%;
        min-height: 200px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding: 15px 5px 15px 300px;
    }

    .article_li:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .article_thumbnail {
        height: 170px;
        width: 270px;
        position: absolute;
        left: 5px;
    }

    .article_thumbnail img {
        width: 260px;
        height: 170px;
    }

    .article_list_title a {
        display: inline-block;
    }

    .article_list_title a:hover {
        text-decoration: none;
    }

    .article_type span {
        position: relative;
        display: block;
        top: -1px;
        width: 53px;
        height: 26px;
        font-size: 14px;
        line-height: 26px;
        padding-left: 15px;
        color: #fafafa;
        background-color: #42b983;
    }

    .article_type span:before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        right: 0;
        border-top: 13px solid transparent;
        border-right: 10px solid #ffffff;
        border-bottom: 13px solid transparent;
    }

    .article_title {
        color: #3c3e3f;
        font-size: 20px;
        line-height: 26px;
        -webkit-transition: color 0.25s;
        -moz-transition: color 0.25s;
        -ms-transition: color 0.25s;
        -o-transition: color 0.25s;
        transition: color 0.25s;
    }

    .article_title:hover {
        color: #42b983;
    }

    .mate {
        font-size: 12px;
        line-height: 30px;
        color: #5a5a5a;
    }

    .mate span {
        padding-left: 5px;
    }

    .mate span:last-child {
        float: right;
        padding-right: 15px;
    }

    .description {
        font-size: 13px;
        color: #5a5a5a;
    }

    @media screen and (max-width: 680px) {
        .container {
            margin: 0;
        }
        .article_li {
            min-height: 130px;
            padding: 15px 150px 15px 5px;
        }
        .article_thumbnail {
            height: 85px;
            width: 130px;
            right: 5px;
            left: auto;
        }
        .article_thumbnail img {
            width: 130px;
            height: 85px;
        }
        .article_type span {
            width: 40px;
            height: 20px;
            font-size: 10px;
            line-height: 20px;
        }
        .article_type span:before {
            border-top: 10px solid transparent;
            border-right: 10px solid #ffffff;
            border-bottom: 10px solid transparent;
        }
        .article_title {
            font-size: 15px;
            line-height: 20px;
        }
        .mate span {
            white-space: nowrap;
        }
        .mate span:last-child {
            display: block;
            float: none;
            text-align: right;
        }
        .description {
            display: none;
        }
    }

    @media screen and (max-width: 1020px) {
        .content-wrap {
            margin-right: 0;
        }
    }

    @media screen and (min-width: 1021px) and (max-width: 1235px) {

    }

    @media screen and (min-width: 681px) and (max-width: 1235px) {
        .container {
            margin: 0 20px;
        }
    }
</style>

<script>
    import SlideShow from '../lpart/slideshow.vue';
    import Pagination from '../components/page.vue';

    export default {
        name: 'indexP',
        data: function () {
            return {
                article_lists: [],
                page_num: 1,
                page_sum: 1,
                article_type: 0,
                request_url: "https://qzapi.songbaixin.com/page/",
            }
        },
        created: function () {
            let urlHash = window.location.hash;
            if(urlHash === "#/" || urlHash === ""){
                this.article_type = 0;
            }else if(urlHash.search("#/blog") !== -1){
                this.article_type = 1;
            }else if(urlHash.search("#/file") !== -1){
                this.article_type = 2;
            }
            this.toPage(this.request_url, this.article_type, 1);
        },
        methods: {
            getArticle: function (url) {
                return new Promise((resolve, reject) => {
                    Vue.http.get(url)
                        .then((res) => {  //successed
                            this.showArticle(res);
                        })
                        .catch((res) => {  //failed
                            this.showArticleError();
                        });
                });
            },
            showArticle: function (res) {
                this.article_lists = res.body.article_list;
                this.page_num = res.body.page_num;
                this.page_sum = res.body.page_sum;
            },
            showArticleError: function () {
                this.article_lists = "error";
            },
            toPage: function (url, type, page) {
                this.getArticle(url + "" + type + "/" + page);
            }
        },
        components: {
            SlideShow,
            Pagination
        }
    }
</script>