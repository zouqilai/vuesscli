//工具函数
//配置合并
function extend (def,opt,override) {
	for(var k in opt){
		if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)){
			def[k] = opt[k]
		}
	}
	return def;
}
//日期格式化
function formartDate (y,m,d,symbol) {
	symbol = symbol || '-';
	m = (m.toString())[1] ? m : '0'+m;
	d = (d.toString())[1] ? d : '0'+d;
	return y+symbol+m+symbol+d
}
//日期排序
function dateSort(arr){
	return arr.sort(function(a,b){
		return new Date(a)- new Date(b);
	});
}
//阻止事件冒泡
function stopPropagation(e) { 
　　if (e.stopPropagation) 
　　　　e.stopPropagation(); 
　　else 
　　　　e.cancelBubble = true; 
} 
/**
Schedule类私有属性和方法
	el  type:String 元素
	date type:String xxxx-xx-xx
	isDouble type:boolean 是否双日历
	clickCb return Array.toString 'xxxx-xx-xx,xxxx-xx-xx'
	nextMonthCb return y,m,d
	nextYeayCb return y,m,d
	prevMonthCb  return y,m,d
	prevYearCb return y,m,d

bindEvent 
	给el做事件代理
	点击返回相应的日期
	渲染日历
render
	动态拼接日历中日期（选中和当天）
init
	初始化日历
	拼接日历主框架
	事件，渲染
***/

function Schedule (opt) {
	var def = {},
		opt = extend(def,opt,true),
		curDate = opt.date ? new Date(opt.date) : new Date(),
		year = curDate.getFullYear(),
		month = curDate.getMonth(),
		day = curDate.getDate(),	
		currentYear = curDate.getFullYear(),
		currentMonth = curDate.getMonth(),
		currentDay = curDate.getDate(),
		selectedDate = '',
		selectedDateArray = [],
		el = document.querySelector(opt.el) || document.querySelector('body'),
		//是否需要双日历
		isDouble = opt.isDouble,
		_this = this;
	var bindEvent = function (){
		el.addEventListener('click',function(e){
			stopPropagation(e);
			switch (e.target.id) {
				case 'nextMonth': 
					_this.nextMonthFun();
					break;
				case 'nextYear': 
					_this.nextYearFun();
					break;
				case 'prevMonth': 
					_this.prevMonthFun();
					break;
				case 'prevYear': 
					_this.prevYearFun();
					break;
				default:
					break;
			};
			if(e.target.className.indexOf('currentDate') > -1){
				selectedDate = e.target.title;

				//开始和结束的处理方法  一直取得数组最后面的两个日期，(再按从小到大排序，取消排序，顺序会搞乱)
				selectedDateArray.push(selectedDate);
				if(isDouble){
					selectedDateArray.length > 2 && selectedDateArray.shift();
				}else{
					selectedDateArray = selectedDateArray.slice(-1);
				}
				
				//selectedDateArray = dateSort(selectedDateArray);
				//console.log(selectedDateArray);

				//opt.clickCb && opt.clickCb(year, month+1, e.target.innerHTML);
				opt.clickCb && opt.clickCb(selectedDateArray.join(','));
				
				day = e.target.innerHTML;
				render();
			}
		},false)
	}
	var init = function () {
		var scheduleHd = '<div class="schedule-hd">'+
							'<div>'+
								'<span id="prevYear" >《年</span>'+
								'<span id="prevMonth">《月</span>'+
							'</div>'+
							'<div class="today">'+formartDate(year,month+1,day,'-')+'</div>'+
							'<div>'+
								'<span id="nextMonth">》月</span>'+
								'<span id="nextYear">》年</span>'+
							'</div>'+
						'</div>'
		var scheduleWeek = '<ul class="week-ul ul-box">'+
								'<li>日</li>'+
								'<li>一</li>'+
								'<li>二</li>'+
								'<li>三</li>'+
								'<li>四</li>'+
								'<li>五</li>'+
								'<li>六</li>'+
							'</ul>'
		var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>'; 
		el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
		bindEvent();
		render();
	}
	var render = function () {
		var fullDay = new Date(year,month+1,0).getDate(), //当月总天数
			startWeek = new Date(year,month,1).getDay(), //当月第一天是周几
			total = (fullDay+startWeek)%7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
			lastMonthDay = new Date(year,month,0).getDate(), //上月最后一天
			eleTemp = [];
		for(var i = 0; i < total; i++){
			if(i<startWeek){
				eleTemp.push('<li class="other-month"><span class="dayStyle">'+(lastMonthDay-startWeek+1+i)+'</span></li>')
			}else if(i<(startWeek+fullDay)){
				var nowDate = formartDate(year,month+1,(i+1-startWeek),'-');
				var addClass = '';
				for(var j = 0; j < selectedDateArray.length; j++){
					selectedDate = selectedDateArray[j];
					selectedDate == nowDate && (addClass = 'selected-style');
				}
				
				formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag');
				eleTemp.push('<li class="current-month" ><span title='+nowDate+' class="currentDate dayStyle '+addClass+'">'+(i+1-startWeek)+'</span></li>')
			}else{
				eleTemp.push('<li class="other-month"><span class="dayStyle">'+(i+1-(startWeek+fullDay))+'</span></li>')
			}
		}
		el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
		el.querySelector('.today').innerHTML = formartDate(year,month+1,day,'-');
	};
	this.nextMonthFun = function () {
		if(month+1 > 11){
			year += 1;
			month = 0;
		}else{
			month += 1;
		}
		render();
		opt.nextMonthCb && opt.nextMonthCb(year,month+1,day);
	},
	this.nextYearFun = function () {
		year += 1;
		//selectedDateArray.length=0;
		//selectedDateArray.push(year+'-'+(month+1)+'-'+day);
		render();
		opt.nextYeayCb && opt.nextYeayCb(year+'-'+(month+1)+'-'+day);
	},
	this.prevMonthFun = function () {
		if(month-1 < 0){
			year -= 1;
			month = 11;
		}else{
			month -= 1;
		}
		render();
		opt.prevMonthCb && opt.prevMonthCb(year+'-'+(month+1)+'-'+day);
	},
	this.prevYearFun = function () {
		year -= 1;
		render();
		opt.prevYearCb && opt.prevYearCb(year+'-'+(month+1)+'-'+day);
	}
	init();
}
export default Schedule;
