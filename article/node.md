---
category: Node
title: node.js
---

## Node.js不是js应用，而是js运行平台

node.js是一个javascript的运行环境，采用C++语言编写而成。node.js是一个后端的javascript运行环境，也就是说我们可以编写系统级的或者服务器端的javascript代码，交给node.js来执行。
```
#node maomao.js
```
node采用了Google Chroom 浏览器的V8引擎，性能好且提供了很多系统级的API，比如文件操作、网络编程。

## Node.js采用事件驱动、异步编程，为网络服务而设计
Node.js的设计思想是以事件为核心，采用异步的风格。开发人员可以根据自己的业务逻辑注册相应的回调函数，这些函数都是异步执行的，虽然是依次注册，但是是由相应的事件触发。其优势在于充分利用了系统资源，执行代码无需阻塞等待某种操作完成。Node.js拥有HTTP、DNS、NET、UDP、HTTPS、TLS等网络模块，可用于快速构建Web服务器。

## 起服务的一个简单例子
```
var http = require('http');
var server = http.createServer(function(req,res)){
	res.on("data",function(chunk){]
		console.log(chunk);
		//这里的chunk是接收到的数据，注意，如果是get请求的话，这里面并没有数据，参数包含在url当中
	});
	res.on("end",function(){
	console.log("响应结束！")；
	})
}
req.end();
```

