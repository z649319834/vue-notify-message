# vue-notify-message

> 采用vue.js开发的消息弹层插件

## Installation

``` bash
# 安装组件

npm install vue-notify-message

# 使用插件

import Vue from "Vue"

import notifyMsg from "vue-notify-message"

Vue.use(notifyMsg)

```

## Examples

![demo]()

## Documentation

``` bash

## 方法介绍

//主方法
this.$notify(opts);

# opts属性介绍，属性可选

{
	//消息类型，true为tips消息，false为alert消息,默认为false
	type:false,

	// 弹层大容器样式对象
	notify:{
		cssClass:"",	//类名样式设置
		style:{}		//行内样式设置
	},

	// 弹层主体内容样式对象
	body:{
		cssClass:"",	
		style:{}
	},

	// 关闭按钮设置对象,type为true时不显示
	close:{
		cssClass:"",
		style:{},
		callBack:null
	},

	// 标题设置对象
	title:{
		text:"",		//标题内容设置，可以是DOM结构
		cssClass:"",
		style:{}
	},

	// 消息设置对象
	msg:{
		text:"",		//消息内容设置，可以是DOM结构
		cssClass:"",
		style:{}
	},

	// 操作按钮容器样式设置对象,type为true时不显示
	btnBody:{
		cssClass:"",
		style:{}
	},

	// 操作按钮设置对象,type为true时不显示
	buttonObj:[
		/*{
			html:"",
			type:1,			//默认设置的按钮样式，可选择为1，2
			style:{},
			cssClass:"",
			callBack:null	//回调执行,如果设置了该值,则接受一个回调函数参数,用于执行后关闭弹层
		}*/
	],

	//延时时间设置，默认2000
	delay:2000,

	// 延时回调
	delayFn:null,

	// 初始化执行,在组件mounted时执行
	initFn:null
}

```

## Code

```bash

this.$notify({
    title:{
        text:"这是弹层标题",
        style:{backgroundColor:'#eee'}
    },
    msg:{
        text:"这是alert弹层，执行方法为this.$notify.alert()",
        style:{width:"500px"}
    },
    buttonObj:[
        {
            html:"取消",
            type:1,
            callBack:null 		//callBack不设置可以不写此属性
        },
        {
            html:"返回我的项目",
            type:2,
            callBack:function(cb){		//设置了callBack的值,默认有一个回调函数参数需要在此函数里执行，用于关闭弹层
                _this.$router.push("/test");
                cb()
          
            }
        },
        {
            html:"确定",
            type:1,
            callBack:function(cb){
                _this.$http.get("http://jspang.com/DemoApi/oftenGoods1.php")
                .then(res=>{
                    console.log("res",res);
                    cb()
                }).catch(err=>{
                    _this.$notify({
                        type:true,
                        msg:{
                            text:err
                        },
                        delay:5000,
                        delayFn:function(){
                            console.log("延时操作");
                            
                        }
                    })
                })
                
            }
        }
    
    ]
})

```

## License

MIT © (zcz)[mailto 649319834@qq.com]

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
