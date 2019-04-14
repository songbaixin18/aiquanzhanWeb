<template>
    <div class="container">
        <div class="content-wrap">
            <slide-show></slide-show>
            <ol>
                <li v-for="todo in todos">
                    {{ todo.text }}
                </li>
            </ol>
            <button @click="eClick()">事件</button>
        </div>
    </div>
</template>

<style>
    .content-wrap{
        margin-right: 400px;
    }
    @media screen and (max-width:680px){
        .container{
            margin: 0;
        }
    }
    @media screen and (max-width: 1020px){
        .content-wrap{
            margin-right: 0;
        }
    }
    @media screen and (min-width: 1021px) and (max-width:1235px){

    }
    @media screen and (min-width: 681px) and (max-width:1235px) {
        .container{
            margin: 0 20px;
        }
    }
</style>

<script>
    import SlideShow from '../lpart/slideshow.vue';
    export default {
        name: 'indexP',
        data:function () {
            return {
                todos: [
                    { text: 'Learn JavaScript' },
                    { text: 'Learn Vue' },
                    { text: 'Build something awesome' }
                ]
            }
        },
        create:function(){
            this.getArticle("https://qzapi.songbaixin.com/page/0/0")
        },
        methods:{
            getArticle:function (url) {
                return new Promise((resolve, reject) => {
                    Vue.$http.get(
                        url
                    )
                        .then((res) => {   //成功的回调
                            resolve(res);
                        })
                        .catch((res) => {  //失败的回调
                            reject(res);
                        });
                });
            }

        },
        components:{
            SlideShow
        }
    }
</script>