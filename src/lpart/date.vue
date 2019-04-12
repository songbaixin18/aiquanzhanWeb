<template>
    <div class="dateshow">
        <p>
            <slot></slot>
            {{dateString}}
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            value: Number
        },
        data: function() {
            return{
                dateString:''
            }
        },
        methods:{
            inDate: function () {
                Date.prototype.toLocaleString = function() {
                    let Month = this.getMonth() + 1;
                    if(Month<10){
                        Month = '0' + Month;
                    }
                    let Day = this.getDate();
                    if(Day<10){
                        Day = '0' + Day;
                    }
                    let Hours = this.getHours();
                    if(Hours<10){
                        Hours = '0' + Hours;
                    }
                    let Minutes = this.getMinutes();
                    if(Minutes<10){
                        Minutes = '0' + Minutes;
                    }
                    let Seconds = this.getSeconds();
                    if(Seconds<10){
                        Seconds = '0' + Seconds;
                    }
                    return this.getFullYear() + "年" + Month + "月" + Day + "日 " + Hours + "点" + Minutes + "分" + Seconds + "秒";
                };
                let unixTimestamp = new Date( this.value ) ;
                let commonTime = unixTimestamp.toLocaleString();
                this.dateString = commonTime;
            }
        },
        watch:{
            'value':function () {
                this.inDate();
            }
        },
        created:function () {
            this.inDate();
        }
    }
</script>