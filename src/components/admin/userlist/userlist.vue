<template>
    <div>
        <div class="op-wx-user-box" v-on:click="hideSchedule">
        	<div class="op-wx-user-header">筛选，(总人数23232)</div>
            <div class="op-wx-user-screen">
                <form @submit.prevent="onSubmit"> 
                <div class="op-wx-user-screen-i">
                    <div class="op-wx-user-screen-il">
                        <label for="usersex">性别</label>
                        <select v-model="selectedSex" id="usersex">
                            <option disabled value="">请选择</option>
                            <option value="1">女</option>
                            <option value="2">男</option>
                        </select>
                    </div>
                    <div class="op-wx-user-screen-ir">
                        <label for="usersex">授权时间</label>
                        <input v-model="timeStartEnd" v-on:click.stop="showSchedule" placeholder="起止时间">
                        <div id="schedule-box" class="boxshaw" v-show="isShowSchedule"></div>
                    </div>
                </div>
                <input type="submit" value="查询">
                </form>
            </div>
        </div>
        <div class="op-wx-user-box">
            <table class="op-wx-user-table">
                <thead>
                    <tr>
                        <td>id</td>
                        <td style="cursor:pointer" @click="sortName">昵称</td>
                        <td>性别</td>
                        <td style="cursor:pointer" @click="sortTime">授权时间</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in users">
                        <td>{{item.uid}}</td>
                        <td>{{item.uname}}</td>
                        <td>{{item.sex==2?'男':'女'}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Schedule from '../../../config/schedule.js';
import {getUsers,getScreenUser} from '../../../service/getData';
export default {
    data() {
        return {
            selectedSex:'',
            isShowSchedule: false,
            timeStart:'',
            endStart:'',
            timeStartEnd:'',
            users: {
                type: Array
            }
        };
    },
    created(){
         this.getUsersFun();
    },
    mounted(){
        this.$nextTick(()=>{
            this._initSchedule();
        });
    },
    methods:{
        _initSchedule(){
            const _this = this;
            this.mySchedule = new Schedule({
                el: '#schedule-box',
                isDouble: true,
                //date: '2018-9-20',
                clickCb: function (v) {
                    _this.timeStartEnd = v;
                    v = _this.dateSort(v.split(','));
                    _this.timeStart = v[0];
                    _this.endStart = v[1];
                    //_this.timeStart = y+'-'+m+'-'+d;
                },
                nextMonthCb: function (v) {
                    //do something
                },
                nextYeayCb: function (v) {
                    console.log(v);
                    //do something
                },
                prevMonthCb: function (v) {
                    //do something   
                },
                prevYearCb: function (v) {
                    //do something
                }
            });
        },
        dateSort(arr){
            return arr.sort(function(param1, param2){
                return new Date(param1)- new Date(param2);
            });
        },
        showSchedule(){
            this.isShowSchedule = true;
        },
        hideSchedule(){
            this.isShowSchedule = false;
        },
        //按时间搜索 没做没数据的处理
        async onSubmit(){
            const response = await getScreenUser(this.selectedSex, this.timeStart, this.endStart);
            if(!response.errno){
                this.users = response.data;
            }
        },
        //获取所有用户 没做没数据的处理
        async getUsersFun(){
            const response = await getScreenUser();
            if(!response.errno){
                this.users = response.data;
            }
        },
        sortName(){
            this.users.sort(function(param1, param2){
                return param1.uname.localeCompare(param2.uname,"zh");
            });
        },
        sortTime(){
            this.users.sort(function(param1, param2){
                return new Date(param1.time) - new Date(param2.time);
            });
        }
    },
    components: {
        //'v-header': header
    }
    
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.op-wx-user-box
    border:1px solid #ccc
    margin-bottom:15px
    .op-wx-user-header
        border-bottom:1px solid #ccc
        height:30px
        line-height:30px
        padding-left:15px
    .op-wx-user-screen
        padding:15px
        .op-wx-user-screen-i
            display:flex
            .op-wx-user-screen-il
                margin-right:20px
            .op-wx-user-screen-ir
                position:relative
                #schedule-box{
                    width: 320px;
                    margin: 0 auto;
                    padding: 35px 20px;
                    font-size: 13px;
                    position: absolute;
                    background-color: #fff;
                }
                .schedule-hd{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 15px;
                }
                .today{
                    flex: 1;
                    text-align: center;
                }
                .ul-box{
                    overflow: hidden;
                }
                .ul-box li{
                    float: left;
                    width: 14.28%;
                    text-align: center;
                    padding: 5px 0;
                    list-style: none;
                }
                .other-month{
                    color: #999999;
                }
                .current-month{
                    color: #333333;
                }
                .today-style{
                    border-radius: 50%;
                    background: #58d321;
                }
                .arrow{
                    cursor: pointer;
                }
                .dayStyle{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 35px;
                    cursor: pointer;
                }
                .current-month > .dayStyle:hover{
                    background: #00BDFF;
                    color: #ffffff;
                }
                .today-flag{
                    background: #00C2B1;
                    color: #fff;
                }
                .boxshaw{
                    box-shadow: 2px 2px 15px 2px #e3e3e3;
                }
                .selected-style {
                    background: #00BDFF;
                    color: #ffffff;
                }
    .op-wx-user-table
        width:100%
        tr
            height:28px
            line-height:28px
            border-bottom:1px solid #ccc
            text-align: center
</style>