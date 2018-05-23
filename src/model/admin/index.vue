<template>
    <div id="admin">
        <div class="op-wx-left">
            <router-link to="/admin/userlist">用户列表</router-link>
            <router-link to="/admin/newtype">文章类别列表</router-link>
            <router-link to="/admin/newslist">文章列表</router-link>
            <router-link to="/admin/powerlist">轮播图列表</router-link>
            <router-link to="/admin/canallist">对接聚到列表</router-link>
            <router-link to="/admin/topiclist">专题页列表</router-link>
        </div>
    	<div class="op-wx-right">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    components: {
        
    }
    
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.op-wx-left
    width: 260px
    padding: 40px 20px 60px 60px
    position:fixed
    top:0
    left: 0
    bottom: 0
    overflow-x: hidden
    overflow-y: auto
    border-right: 1px solid #ccc
.op-wx-left
    a
        display:block
        text-decoration: none
        line-height: 30px
        color:#000
.op-wx-right
    margin-left: 290px
    position: relative
    padding: 2.2em 0
    max-width: 600px
    margin: 0 auto
    padding-left: 50px
</style>