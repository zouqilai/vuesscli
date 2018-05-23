import Vue from 'vue';
import Router from 'vue-router';

const userlist = () => import('@/components/admin/userlist/userlist');
const newType = () => import('@/components/admin/newtype/newtype');
const edit = () => import('@/components/admin/newtype/edit');
const reg = () => import('@/components/admin/reg/reg');

Vue.use(Router)

export default () => {
	return new Router({
	  routes: [
	  	{

	  		path: '/admin/userlist',
	    	name: 'userlist',
	    	component: userlist,

	    	// children:[
		    // 	{
		    // 		path:'#/admin/login',
		    // 		name:'login',
		    		
		    // 	}
	    	// ]
	    	
	  	},
	  	{
	  		path: '/admin/newtype',
	  		name: 'newType',
	  		component: newType
	  	},
	  	{
	  		path: '/admin/newtypedit',
	    	name: 'newTypedit',
	    	component: edit
	    },
	  	{
	  		path: '/admin/reg',
	    	name: 'reg',
	    	component: reg
	    },
	    // {
	    //   path: '*',
	    //   redirect: '/'
	    // }
	  ],
	  //base: __dirname,
	  mode: 'history'
	})
}


