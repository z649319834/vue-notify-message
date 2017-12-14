<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2 class="examples">Examples</h2>
    <ul class="buttons">
        <li class="btn" @click="messageHandler">Message</li>
        <li class="btn" @click="alertHandler">Alert</li>
        <li class="btn" @click="tipsHandler">Tips</li>
    </ul>
</div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to vue-notify-message'
        }
    },
    methods:{
        messageHandler(){
            let _this=this;
            this.$notify({
                title:{
                    text:"这是弹层标题",
                    style:{backgroundColor:'#eee'}
                },
                msg:{
                    text:"<img style='margin:0 auto;width:48px;' src='http://mat1.gtimg.com/yslp/vgo/images/icon-warn.png'><p>插入失败，不支持的文件格式</p><p style='font-size:14px;color:#808080;'>视频支持MP4;图片支持JPG、PNG</p>",
                    style:{width:"500px"}
                },
                buttonObj:[
                {
                    html:"取消",
                    type:1,
                    callBack:function(cb){
                        cb();
                    }
                },
                {
                    html:"返回我的项目",
                    type:2,
                    callBack:function(cb){
                        console.log("返回我的项目")
                        cb()

                    }
                },
                {
                    html:"确定",
                    type:1,
                    callBack:function(cb){
                        console.log("确定");
                        cb();
                    }
                }

                ]
            })
        },
        alertHandler(){
            let _this=this;
            this.$notify.alert({
                title:"这是标题，标题无内容可省略",
                msg:"这是alert弹层，执行方法为this.$notify.alert()",
                buttonObj:[
                {
                    html:"取消",
                    type:1,
                    callBack:function(cb){
                        console.log("alert-取消");
                        cb();
                    }
                },
                {
                    html:"确定",
                    type:2,
                    callBack:function(cb){
                        _this.$http.get("http://jspang.com/DemoApi/oftenGoods1.php")
                        .then(res=>{
                            console.log("请求成功",res);
                            cb()
                        }).catch(err=>{
                            _this.$notify.tips("打开控制台，查看请求错误！",3000,
                                        function(){
                                            console.log("延时操作");
                                            
                                        })
                        })
                    }
                }
                ],
                onClose:function(){
                    console.log("关闭按钮");
                }
            })
        },
        tipsHandler(){
            this.$notify.tips("这是tips弹层，执行方法为this.$notify.tips()",
                5000,
                function(){console.log("延时5s回调tips");})
        }
    }
}
</script>

<style>
    *{
        margin:0;
        padding:0;
    }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
  }

  h1, h2 {
      font-weight: normal;
  }

  ul {
      list-style-type: none;
      padding: 0;
  }

  li {
      display: inline-block;
      margin: 0 10px;
  }

  a {
      color: #42b983;
  }
  .examples{
    padding:50px 0;
  }
  .buttons{
    width:100%;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items:center;
}
.btn{
    margin:10px 20px;
    width:140px;
    height:50px;
    text-align:center;
    line-height:50px;
    border-radius:5px;
    color:#fff;
    background-color:#18C2FF;
    cursor:pointer;

}
</style>
