import Vue from 'vue';
import Router from 'vue-router';
import remen from '@/components/remen/remen';
//const remen = () => import(/* webpackChunkName: "group-home" */  '@/components/remen/remen');
//import jiatingjiaoyu from '@/components/jiatingjiaoyu/jiatingjiaoyu';
const jiatingjiaoyu = () => import(/* webpackChunkName: "group-home" */  '@/components/jiatingjiaoyu/jiatingjiaoyu');
const detail = () => import(/* webpackChunkName: "group-home" */  '@/components/detail/detail');
const login = () => import(/* webpackChunkName: "group-admin" */  '@/components/admin/login/login');
const reg = () => import(/* webpackChunkName: "group-admin" */  '@/components/admin/reg/reg');
//import detail from '@/components/detail/detail'

Vue.use(Router)

export default () => {
	return new Router({
	  routes: [
	  	{
	  		path: '/remen',
	    	name: 'remen',
	    	component: remen,
	    	props: { name: 'remen' }
	  	},
	  	{
	  		path: '/jiatingjiaoyu',
	  		name: 'jiatingjiaoyu',
	    	component: remen,
			props: { name: 'jiatingjiaoyu' }
	  	},
	  	{
	  		path: '/detail/:fid/:id',
	    	name: 'detail',
	    	component: detail
	  	},
	  	{

	  		path: '/admin/login',
	    	name: 'admin',
	    	component: login,

	    	// children:[
		    // 	{
		    // 		path:'#/admin/login',
		    // 		name:'login',
		    		
		    // 	}
	    	// ]
	    	
	  	},
	  	{
	  		path: '/admin/reg',
	    	name: 'admin',
	    	component: reg
	    },
	    {
	      path: '*',
	      //name: 'remen',
	      //component: remen
	      redirect: '/remen'
	    }
	  ],
	  base: __dirname,
	  mode: 'history'
	})
}


