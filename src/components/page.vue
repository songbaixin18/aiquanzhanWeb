<template>
    <ul class="page_ul">
        <li v-if="page_num !== 1">
            <a href="#"
               @click="$emit('toPage',request_url,article_type,page_num - 1)">
                上一页
            </a>
        </li>
        <template v-if="page_num >= 7">
            <li>
                <a href="#"
                   @click="$emit('toPage',request_url,article_type,1)">
                    1
                </a>
            </li>
            <li v-if="page_sum - 7 !== 1">
                <span class="noselect">
                    ...
                </span>
            </li>
        </template>
        <template v-if="page_num < 7 && page_sum <= 7">
            <li v-for="n in page_sum">
                <a href="#"
                   @click="$emit('toPage',request_url,article_type,n)"
                   :class="(page_num === n)?'current_page':''">
                    {{n}}
                </a>
            </li>
        </template>
        <template v-if="page_num < 7 && page_sum > 7">
            <li v-for="n in 7">
                <a href="#"
                   @click="$emit('toPage',request_url,article_type,n)"
                   :class="(page_num === n)?'current_page':''">
                    {{n}}
                </a>
            </li>
            <li>
                <span class="noselect">
                    ...
                </span>
            </li>
        </template>
        <template v-if="page_num >= 7">
            <template v-if="page_sum >= (page_num + 3)">
                <li v-for="n in 7">
                    <a href="#"
                       @click="$emit('toPage',request_url,article_type,page_num - 4 + n)"
                       :class="(page_num === page_num - 4 + n)?'current_page':''">
                        {{page_num - 4 + n}}
                    </a>
                </li>
                <li v-if="page_sum - page_num !== 3">
                    <span class="noselect">
                        ...
                    </span>
                </li>
            </template>
            <template v-if="page_sum < (page_num + 3)">
                <li v-for="n in 7">
                    <a href="#"
                       @click="$emit('toPage',request_url,article_type,page_sum - 7 + n)"
                       :class="(page_num === page_sum - 7 + n)?'current_page':''">
                        {{page_sum - 7 + n}}
                    </a>
                </li>
            </template>
        </template>
        <li v-if="page_num !== page_sum">
            <a href="#"
               @click="$emit('toPage',request_url,article_type,page_num + 1)">
                下一页
            </a>
        </li>
        <li>
            <span class="noselect">
                共 {{page_sum}} 页
            </span>
        </li>
    </ul>
</template>

<style>
    .page_ul {
        padding: 15px 0;
    }
    .page_ul li {
        display: inline-block;
    }
    .current_page{
        pointer-events:none;
        background: #42b983!important;
        color: #fafafa!important;
    }
    .page_ul li a {
        display: inline-block;
        font-size: 13px;
        width: auto;
        height: 25px;
        line-height: 25px;
        background: #dadada;
        color: #555;
        border-radius: 2px;
        padding: 0 10px;
        margin: 0 2px;
    }
    .page_ul li span {
        font-size: 10px;
        height: 25px;
        line-height: 25px;
        color: #aaa;
        padding: 0 5px;
    }
    .page_ul li a:hover {
        background: #ccc;
        text-decoration: none;
    }
</style>

<script>
    export default {
        props: {
            page_num: Number,
            page_sum: Number,
            article_type: Number,
            request_url: String,
        },
        data: function () {
            return{
            }
        }
    }
</script>