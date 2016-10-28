---
category:Node
title:使用node爬取网页数据并用图表展现
---

## 前言
网络上充斥着大量的信息，数据分析是现在比较火的方向，在资金不足的情况下，很多公司都会采取众筹的方式，筹集资金来开发产品，猫猫 的这篇文章算不上是真正的爬虫工具，但是确能完美的实现拿到数据并展现的功能，如果你感兴趣，也可以自己试试看。

## 说明
本文以爬取xx众筹智能门锁页为例，展现爬取的实现方法。尝试的话也可以以其它网页为目标对象，都是可以实现的。其中的主要思想就是用node发送http请求去请求目标地址，这个url、method、port、host等都可以在网页的请求头中看到，利用这些信息我们就可以轻松的假装自己是xx众筹的前端给后端发请求拿数据了，哈哈哈哈～～～～喵(淡定)。

## 第一步：使用node的http模块创建一个http请求
node的模块很多，http模块是猫猫接触的第一个node模块，现在看来也是猫猫用的最多的一个模块。node是个多层夹心糖，越吃越有意思。下面是代码部分：
```

var http = require("http");

//用node的http模块请求目标服务器的数据
var qs = require("querystring")
var get_data = {
    q:'智能锁'   //需要提交的数据
}
var content = qs.stringify(get_data);
var options = {
    hostname:'xxx.xxx.x.xxx',
    port:80,
    path:'/gs/getList?' + content,
    method:'GET'
}
var shuju ='';
//创建请求  
var get_shuju = function(callback){
    var req=http.request(options,function(res){  
        console.log('STATUS:'+res.statusCode);  
        console.log('HEADERS:'+JSON.stringify(res.headers));         
        res.setEncoding('utf-8');  
        res.on('data',function(chunk){  
            console.log(chunk);  
            shuju += chunk;
        });  
        res.on('end',function(){  
            console.log('响应结束********'); 
            //回调函数的作用是把拿到的数据导出用以页面显示 
            callback(shuju);
        });  
    });  
    req.on('error',function(err){  
        console.error(err);  
    });  
    req.end(); 
}
//将获取数据方法导出用以其它js脚本调用
exports.get_shuju = get_shuju;
```
以上就完成了发送http请求的部分（注意host猫猫没有给出，由于xxoo的原因，亲可以自己找一个页面测试），那么接下来猫猫要考虑的是怎么把这个数据传到页面上。作为一个前端很容易想到，前端页面是通过发送http请求来获取数据的，所以我们现在还需要一个服务器资源供前端请求数据用，那么node的http模块的另一个作用就体现出来了，so，看下面就知道了。

## 第二：使用node的http模块搭建一个服务供前端请求数据用
node的http模块既能发出请求又能接受请求，感觉好厉害的样子。起服务要用到http.createServer方法，代码如下：
```
var fs = require("fs");
var http = require("http");
//用node的http模块搭建一个服务供前端请求数据用
var log = console.log.bind(console);
http.createServer(function(req,response){
	var url = req.url;
	if(url == '/data') {
		var connect = require('./http.js');
		connect.get_shuju(function(data){
			response.writeHead(200,{
				'Content-type':'application/json; charset:urf8',
				// 下面这行可以用来跨域，，在这里可以不要
				"Access-Control-Allow-Origin":"*"
			});
			response.end(data);
		});
	}
	if(url == '/index' || url == '/' || url == ''){
		response.writeHead(200,{
			'Content-type':'text/html',
			// 下面这行可以用来跨域，，在这里可以不要
			"Access-Control-Allow-Origin":"*"
		});
		fs.readFile("./index.html","utf8",function (error,data){
			if(error) throw error;
			response.end(data);
		});
	}
	
	// response.end('<h1>hello</h1>')

}).listen(8888,"localhost",function(){
	console.log("服务已启动");
});

//终端打印如下信息
console.log('Server running at http://127.0.0.1:8888');

//接下来使用node命令执行以上的代码
// node server.js
//然后打开浏览器访问http://127.0.0.1:8888/,得到一个hello world页面
```
从代码当中可以看到，服务是监听的本地localhost:8888端口，所以前端页面请求数据时应该访问这个地址。其实整个过程猫猫觉得最难理解的部分就是配置路由的部分，所以这部分应该重点理解。没有路由前端请求数据的时候就不知道具体的路径，就无法拿到数据。


## 第三：前端页面请求并呈现数据
终于到了html大显身手的时刻了，来看看我们的html代码：
```
<!DOCTYPE html>
<html>
<head>
	<title>little seo</title>
	<meta charset="utf-8">
	<!-- 引入echarts文件 -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/echarts/3.2.3/echarts.min.js"></script>
</head>
<body>
	<div id="main" class="seo" style="width:1000px;height:600px;border:1px solid black;margin:40px auto"></div>
	<!-- <script type="text/javascript" src="./data.js"></script> -->
	<script type="text/javascript">
		var xhr = new XMLHttpRequest;
		xhr.open("GET","http://127.0.0.1:8888/data",true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status = 200 && xhr.status < 300||xhr.status == 304){
					console.log("success");
					//如果请求数据成功,new一个变量并解析json为数组
					var responsetext = xhr.responseText;
					var data = JSON.parse(responsetext);
					//打出data看是否是自己想要的数据格式
					var list = data.list;
					//已筹金额数组
					var collectedAmount = [];
					//支持人数数组
					var supports = [];
					//项目名称数组
					var projectName = [];
					//遍历list数组找出需要的数据
					list.forEach(function(item){
						collectedAmount.push(item.collectedAmount);
						supports.push(item.supports);
						projectName.push(item.projectName);
					})
					console.log(collectedAmount);
					console.log(supports);
					console.log(projectName);
				}
				else{
					//打出error
					console.log(xhr.responseText);
				}
			}

		//基于准备好的Dom,初始化echarts
		var myChart = echarts.init(document.getElementById("main"));

		//指定图表的配置项和数据
		option = {
		    title : {
		        text: 'xx智能锁已筹集金额和支持人数',
		        subtext: '真实数据'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['已筹集金额','支持人数']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : projectName
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'已筹集金额',
		            type:'bar',
		            data:collectedAmount,
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'支持人数',
		            type:'bar',
		            data:supports,
		            markPoint : {
		                 data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name : '平均值'}
		                ]
		            }
		        }
		    ]
		};
		//使用刚指定的配置项和数据显示图表
		myChart.setOption(option);
		}
		xhr.send(null);
	</script>
</body> 
</html>

```
代码应该是很清晰的，用原生的ajax去请求数据，将请求到的数据处理成想要的数据格式，然后传到echarts的option中。就是这么easy，我们就实现了简单的数据爬取工作，哈哈哈哈哈哈～～～～～（good job you have done！）。