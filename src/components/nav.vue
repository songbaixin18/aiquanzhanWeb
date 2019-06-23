<template>
    <div class="nav-box">
        <p class="nav-list">
            <router-link v-for="(navTitle,index) in navTitles"
                         v-bind:to="navSrcs[index]"
                         class="nav-item">
                {{navTitle}}
            </router-link>
            <span id='nav-move-line'></span>
        </p>
    </div>
</template>

<style>
    .nav-box{
        display: inline-block;
    }
    a.nav-item {
        color: #42b983;
        width: 90px;
        display: inline-block;
        padding: 10px 5px 10px 5px;
        text-decoration: none;
    }
    a.nav-item:hover{
        text-decoration:none;
    }
    .nav-list{
        display: inline-block;
    }
    #nav-move-line{
        position: absolute;
        height: 5px;
        background: #42b983;
        display: block;
        top: 50px;
        width: 100px;
    }
</style>

<script>
    export default {
        props:{
            navTitles: Array,
            navSrcs: Array,
            navNow: Number
        },
        data:function() {
            return{
                navMoveLineMarginLeft: ''
            }
        },
        mounted: function () {
            let _this = this;
            let temp = 0;
            let navItems = document.getElementsByClassName("nav-item");
            let navMoveLine = document.getElementById("nav-move-line");
            navMoveLine.style.transition="";
            navMoveLine.style.webkitTransform="";
            navMoveLine.style.marginLeft = this.navNow * 100 + 'px';
            this.navMoveLineMarginLeft = this.navNow * 100 + 'px';
            for (let i = 0; i < navItems.length; i ++){
                navItems[i].onclick = function () {
                    navMoveLine.style.transition="";
                    navMoveLine.style.webkitTransform="";
                    navMoveLine.style.marginLeft = i * 100 + 'px';
                    _this.navMoveLineMarginLeft = i * 100 + 'px';
                };
                navItems[i].onmousemove = function () {
                    temp = isNaN(parseInt(_this.navMoveLineMarginLeft.replace("px",""))) ? 0 : parseInt(
                        _this.navMoveLineMarginLeft.replace("px",""));
                    navMoveLine.style.transition="-webkit-transform 300ms ease-out";
                    navMoveLine.style.webkitTransform="translate(" + (i * 100 - temp) +"px,0) scale(1) translateZ(0px)";
                };
                navItems[i].onmouseout = function () {
                    navMoveLine.style.transition="-webkit-transform 300ms ease-out";
                    navMoveLine.style.webkitTransform="translate(0,0) scale(1) translateZ(0px)";
                };
            }
        }
    }
</script>