---
category: javascript
tags: [跨域,javascript,jsonp,HTML5]
title: javascript跨域
---
## 1.什么是跨域
要理解跨域首先要知道javascript语言安全限制中的同源策略。同源策略是指一段脚本只能读取来自同一来源的窗口和文档的属性,即

>主机号+协议+端口必须匹配

| URL | 说明 | 是否允许通信 |
| ----- |:-------------:| -----:|
| http://www.a.com/a.js http://www.a.com/b.js| 同一域名下 | 允许 |
| http://www.a.com/lab/a.js http://www.a.com/script/b.js | 同一域名下不同文件夹 | 允许 |
| http://www.a.com:8000/a.js http://www.a.com/b.js | 同一域名，不同端口 | 不允许 |
| http://www.a.com/a.js https://www.a.com/b.js | 同一域名，不同协议 | 不允许 |
| http://www.a.com/a.js http://70.32.92.74/b.js | 域名和域名对应ip | 不允许 |
| http://www.a.com/a.js http://script.a.com/b.js | 主域相同，子域不同 | 不允许 |
| http://www.a.com/a.js http://a.com/b.js | 同一域名，不同二级域名（同上）| 不允许（cookie这种情况下也不允许访问）|
| http://www.cnblogs.com/a.js http://www.a.com/b.js | 不同域名 | 不允许|

## 2.跨域的实现方式
### 1.document.domain+iframe实现跨域
可以通过设置document.domain的办法来解决。例如在http://www.a.com/a.html和http://script.a.com/b.html两个文件中都加上document.domain = 'a.com'；然后通过a.html文件中创建一个iframe，去控制iframe的contentDocument，这样就可以实现不同二级域名相同顶级域名下的跨域操作，如果将www.a.com的domain设置成c.com是会报错的。代码如下：
```
document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.a.com/b.html';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // 在这里操纵b.html
    alert(doc.getElementsByTagName("h1")[0].childNodes[0].nodeValue);
};
```
### 2.动态创建script
这种方法又被称之为JSONP(JSON with Padding),浏览器禁止了跨域访问，但允许在页面中引入其他域的js文件，这些来自其他域的js文件也能像页面所在域的js文件一样创建函数甚至操作cookie和DOM。以下是通过动态创建script实现跨域的代码：

```
window.onload = function () {
	var script = document.createElement("script");
	script.type = "text/javascript";
	
	//返回的字符串不能像单纯的{name:"littlewords"}
	//而应该像这样的形式  var json = {name:"littlewords"}
	script.src = "http://otherDomain.com/script.php";
	/*
		//http://otherDomain.com/script.php示例代码
		<?php
			echo "var json = {\"name\":\"littlewords\"}"
		?>
	*/
	
	var head = document.getElementsByTagName("head")[0];
	head.insertBefore(script, head.firstChild);
};
```
### 3.使用window.name
在一个窗口(window)的生命周期中，窗口载入的所有页面共享一个window.name,每个页面对window.name都具有读写权利
可以通过在http://domain.com/a.html中将要传递的数据赋值给window.name，再载入http://otherDomain.com/b.hmtl从而实现跨域访问

```
//http://domain.com/a.html代码
<script type="text/javascript">
	window.name = "需要传递的数据"
	//1秒后跳转页面
	setTimeout(function{
		window.location = "http://otherDomain.com/b.hmtl"
	},1000);
</script>

//http://otherDomain.com/b.hmtl代码
<script type="text/javascript">
	alert(window.name);
</script>
```
### 4.HTML5激动人心的postMessage
window.postMessage(message,targetOrigin)方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 * (个人认为尽量不要使用通配符)。
需要接收消息的window对象，可是通过监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。
下面是代码示例：

```
//http:domain.com/a.html
<script type="text/javascript">
function callBack(){
	var ifr = document.getElementById('iframeb');
	var winContent = ifr.contentWindow;
	winContent.postMessage('Hello littlewords','http:www.domain.com')
}
</script>
<iframe id="iframeb" src="http://www.domain.com/b.hmtl onload="callBack()"></iframe>


//http:www.domain.com/b.html
<script type="text/javascript">
window.onmessage = function(e){
	e = e||window.event;
	alert(e.data)//输出结果为 Hello littlewords
}
</script>
```

### 5.CORS跨域资源共享
cors方法跨域简单的说就是ajax的跨域实现，这个知识点阮一峰前辈的文章是精髓，直接搜索cors跨域，第一条记录就是他的文章，猫猫先去那里学习了，一起来吧！





