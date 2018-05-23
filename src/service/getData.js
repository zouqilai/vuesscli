import fetch from '../config/fetch';
export const getOrderList = (urlName) => fetch('/api/'+urlName);
export const getDetail = (fid,id) => fetch('/api/detail',{
	fid:fid,
	id:id
},'POST');
//筛选用户
export const getScreenUser = (sex,timestart,timeend) => fetch('/api/admin/userlist',{
	sex:sex,
	timestart:timestart,
	timeend:timeend
},'POST');
//获取所有用户
export const getUsers = () => fetch('/api/admin/userlist',{},'POST');
//获取文章类别id
export const getNewType = () => fetch('/api/admin/newtype',{},'POST');
//文章类别前移
export const getPreNewType = (id) => fetch('/api/admin/prenewtype',{
	id: id
},'POST');