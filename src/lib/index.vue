<!-- 消息弹层 -->
<template>
	<transition name="fadeIn" mode="in-out">
		<!-- 弹层 -->
		<div class="notify-layer" :class="notify.cssClass" :style="notify.style">
			<!-- 弹层主体 -->
			<div class="notify-body" :class="[type?'notify-tips':'notify-alert',body.cssClass]" :style="body.style">
				<!-- 关闭按钮 -->
				<span v-if="!type" class="notify-close" :class="close.cssClass" :style="close.style" @click.stop="closeHandler(close.callBack)"></span>
				<!-- 标题 -->
				<div v-if="title.text" class="notify-title" :class="title.cssClass" :style="title.style" v-html="title.text"></div>
				<!-- 消息区域 -->
				<div class="notify-msg" :class="msg.cssClass" :style="msg.style" v-html="msg.text"></div>
				<!-- 操作按钮 -->
				<ul v-if="!type" class="notify-buttons" :class="btnBody.cssClass" :style="btnBody.style">
					<li class="notify-btn" v-for="(item,index) in buttonObj" :key="index" @click.prevent="buttonHandler(item.callBack)" :class="[item.type!=2?'notify-btn1':'notify-btn2',item.cssClass]" :style="item.style">{{item.html}}</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name:"vue-notify",
		data:function(){
			return {
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
				preButtons:false,
				// 操作按钮容器样式设置对象
				btnBody:{
					cssClass:"",
					style:{}
				},
				// 操作按钮设置对象
				buttonObj:[
					/*{
						html:"",
						type:"",
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
		},
		mounted(){
			this.initFn && typeof this.initFn =='function' && this.initFn();
		},
		methods:{
			// 关闭弹层
			closeHandler(cb){
				if(cb && typeof cb =="function"){
					cb();
				}
				document.body.removeChild(this.$el);
			},
			// 操作按钮
			buttonHandler(callBack){
				let _this=this;
				if(callBack && typeof callBack =="function"){
					callBack(_this.closeHandler);
				}else{
					this.closeHandler();
				}
			}
		}
	}
</script>

<style scoped>
	.fadeIn-enter-active, .fadeIn-leave-active {
	    opacity: 1;
	    transition: all 0.3s ease reverse;
	}

	.fadeIn-enter, .fadeIn-leave-to {
	    opacity: 0;
	}
	.notify-layer{
		position: fixed;
		top:0;
		left:0;
		z-index: 888;
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		height:100%;
		background: rgba(0,0,0,0.25);
		overflow: hidden;
	}
	.notify-body{
		position: relative;
		/*padding:25px 20px;*/
		width:auto;
		border-radius: 5px;
		background: #fff;
		overflow: hidden;
	}
	.notify-close{
		position: absolute;
		top:10px;
		right:10px;
		z-index: 10;
		width: 16px;
		height:16px;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJ1BMVEUAwvoAwvoAwvoAwvoAwvoAwvoAwvoAwvoAwvoAwvoAwvoAwvoAAACImc/XAAAAC3RSTlMAGgn50xXSCNQWGw7fYRUAAAABYktHRAyBs1FjAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4QcTDxUpnxt/owAAAHVJREFUGNNjYFRggAAmAQZhVyg7zJChbEcAmMnqncTA2t0KZoeAxCLAEqzeICGIBEQETMFUgmioMEgiFCoMkuiACQMldsOEUdjIapD0IpsZsWMCzC7W7k64G0DCUFdBhCESZWBhkFgSg7An1OQQQwYuuN8XAABfryzQPz4O3QAAAABJRU5ErkJggg==") no-repeat center center;
		opacity: 0.7;
		cursor: pointer;
	}
	.notify-close:hover{
		opacity: 1;
	}
	.notify-title{
		padding-left:20px; 
		min-width: 500px;
		height:40px;
		line-height: 40px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-bottom: 1px solid #eee;
		background-color: #eee
	}
	.notify-msg{
		padding: 10px 20px;	
		max-width: 600px;
		text-align: center;
	}
	.notify-tips{
		min-width: 200px;
		text-align: center;		
	}
	
	.notify-alert .notify-msg{
		padding:25px 25px 5px 25px;
	}
	.notify-buttons{
		margin:0;
		padding:0;
		list-style: none;
		padding: 15px 20px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;
	}
	.notify-btn{
		width:140px;
		height:48px;
		margin:0 10px;
		text-align: center;
		line-height: 48px;
		border-radius: 25px;
		border:1px solid #25C4FD;
		color: #70e4ff;
    	background: #fff;
		font-size:16px;
		cursor: pointer;
	}
	.notify-btn1{
		border-color: #70e4ff;
	    color: #70e4ff;
	    background: #fff;
	}
	.notify-btn2{
		border-color: transparent;
	    color: #fff;
	    background-image: -webkit-linear-gradient(left bottom, #00abf7, #00d0fb);
	}
	.notify-btn1:hover{
		background: rgba(120, 230, 255, 0.1);
	}
	.notify-btn2:hover{
		background-image: -webkit-linear-gradient(left bottom, #15baff, #3fd9ff);
	}

</style>