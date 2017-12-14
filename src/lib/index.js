import model from "./index.vue"

let notify={
	DEFAULT_OPTIONS:{
		//消息类型，true为tips消息，false为alert消息
		type:false,
		// 弹层大容器样式对象
		notify:{
			cssClass:"",
			style:{}
		},
		// 弹层主体内容样式对象
		body:{
			cssClass:"",
			style:{}
		},
		// 关闭按钮设置对象
		close:{
			cssClass:"",
			style:{},
			callBack:null
		},
		// 标题设置对象
		title:{
			text:"",
			cssClass:"",
			style:{}
		},
		// 消息设置对象
		msg:{
			text:"",
			cssClass:"",
			style:{}
		},
		// 操作按钮容器样式设置对象
		btnBody:{
			cssClass:"",
			style:{}
		},
		// 操作按钮设置对象
		buttonObj:[
			/*{
				html:"",
				type:1,
				style:{},
				cssClass:"",
				callBack:null
			}*/
		],
		//延时
		delay:2000,
		// 延时回调
		delayFn:null,
		// 初始化执行
		initFn:null,
	}
};

const Message=function(opts={}){
	
	let Tpl=this.extend(model);

	opts={...notify.DEFAULT_OPTIONS,...opts};
	
	let v=new Tpl();
	
	let oDiv=document.createElement("div");
	
	v.$mount(oDiv);
	
	for(let key in opts){
		v.$data[key]=opts[key];
	}
	
	document.body.appendChild(v.$el);
	
	if(opts.type){
		v.timer=setTimeout(()=>{
			clearTimeout(v.timer);
			v.delayFn();
			try{
				document.body.removeChild(v.$el);
			}catch(err){
				throw(err)
			}
			
		},opts.delay)
	}
}

const Alert=function(opts={msg:"",buttonObj:[],title:"",onClose:null}){
	let alertConfig={
		msg:{
			text:opts.msg
		},
		title:{
			text:opts.title
		},
		close:{
			callBack:opts.onClose
		},
		buttonObj:opts.buttonObj
	}

	Message.call(this,{
		...notify.DEFAULT_OPTIONS,
		...alertConfig
	})

}

const Tips=function(msg,deday,callBack){
	let tipsConfig={
		type:true,
		msg:{
			text:msg
		},
		delay:deday,
		delayFn:callBack
	}

	Message.call(this,{
		...notify.DEFAULT_OPTIONS,
		...tipsConfig
	})
}




notify.install=function(Vue){
	Vue.prototype.$notify=Message.bind(Vue);
	Vue.prototype.$notify.alert=Alert.bind(Vue);
	Vue.prototype.$notify.tips=Tips.bind(Vue);
}
export default notify;