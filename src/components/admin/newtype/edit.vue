<template>
    <div>
        <label for="newstypeedit">类别名称</label>
        <input class="op-wx-newtype-input" id="newstypeedit" v-model="newtype.name">
    </div>
</template>
<script>
export default {
    data() {
        return {
            newtype:{
                type: Object
            }
        };
    },
    created(){
        //刷新页面后，根据数据存不存在，决定是否回到文章类别
        const item = this.$route.params.item;
        if(item){
            this.newtype = JSON.parse(item); 
        }else{
            this.$router.push({name:'newType'});
        }
    },
    components: {
        //'v-header': header
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.op-wx-newtype-input
    border:1px solid #ccc
</style>
