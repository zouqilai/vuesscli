<template>
    <div>
        <span class="op-wx-newtype-btn">添加类别</span>
        <!-- <v-add-type v-show="isAddType"></v-add-type> -->
        <table class="op-wx-newtype-table" @click.stop="newHandle($event)">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>类别</td>
                    <td>操作时间</td>
                    <td>操作类别</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in newtype">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.time}}</td>
                    <td>
                        <span v-if="newtype.length!==1" :data-id="item.id" :class="index!==0?'op-wx-newtype-prev':'op-wx-newtype-disable'">前移</span>
                        <span v-if="newtype.length!==1" :data-id="item.id" :class="index!==newtype.length-1?'op-wx-newtype-next':'op-wx-newtype-disable'">后移</span>
                        <span :data-id="item.id" class="op-wx-newtype-del">删除</span>
                        <span :data-item="JSON.stringify(item)" class="op-wx-newtype-edit">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';
import { getNewType, getPreNewType } from '../../../service/getData';
import { hasClass } from '../../../config/mUtils';
export default {
    data() {
        return {
            isAddType: {
                type: Boolean
            },
            newtype: {
                type: Array
            }
        };
    },
    created(){
        this.$nextTick(() => {
            this.getNewTypeFun();
        });
    },
    mounted(){
        //console.log(this.newtype);
    },
    methods:{
        async getNewTypeFun(){
            const response = await getNewType();
            if(!response.errno){
                this.newtype = response.data;
            }
        },
        async getPreNewTypeFun(id){
            const response = await getPreNewType(id);
            if(!response.errno){
                this.newtype = response.data;
            }
        },
        newHandle(e){
            const target = e.target;
            if(hasClass(target,'op-wx-newtype-prev')){
                const id=target.dataset.id;
                const index = this.dataIndex(this.newtype, id);
                //需要向后台发送数据，在更新
                //this.getPreNewTypeFun(id);
                //下面是手动模拟数据
                const preData = this.newtype[index-1];
                const indexData = this.newtype[index];
                Vue.set(this.newtype, index-1, indexData);
                Vue.set(this.newtype, index, preData);
                //
                //console.log(this.newtype);
            }else if(hasClass(target,'op-wx-newtype-next')){
                const id=target.dataset.id;
                const index = this.dataIndex(this.newtype, id);
                //需要向后台发送数据，此处没有写接口
                //下面是手动模拟的过程
                const nextData = this.newtype[index+1];
                const indexData = this.newtype[index];
                Vue.set(this.newtype, index+1, indexData);
                Vue.set(this.newtype, index, nextData);
            }else if(hasClass(target,'op-wx-newtype-del')){
                const id=target.dataset.id;
                this.newtype = this.newtype.filter(function(item){
                    return item.id != id;
                });
            }else if(hasClass(target,'op-wx-newtype-edit')){
                const item=target.dataset.item;
                this.$router.push({name:'newTypedit',params:{item:item}});
            }
        },
        //查找数据中所在的索引
        dataIndex(data, id){
            return data.findIndex(function(item, index, arr){
                return item.id == id;
            });
        }
        //
    },
    components: {
        //'v-header': header
    }
    
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.op-wx-newtype-btn
    border:1px solid #ccc
    padding:8px 10px
    border-radius:5px
    cursor:pointer
.op-wx-newtype-table
    width:100%
    margin-top:15px
    line-height:28px
.op-wx-newtype-prev
    cursor:pointer
.op-wx-newtype-disable
    cursor:default
    color:#ccc
</style>
