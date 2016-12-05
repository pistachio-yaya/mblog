---
category:javascript
title:js原生获取非行间样式
---

### 前言
猫猫写这个知识点是因为自己在写css3动画项目的时候遇到一个问题：动态添加class并把class内的css内容展现出来。
正常我们都是用style来读写css样式，但是这里猫猫想要读的css属性是transform，结果出乎预料，具体看下面的代码。

### 栗子重现

html代码：
```
<!DOCTYPE html>
<html>
<head>
	<title>mao animation</title>
	<link rel="stylesheet" type="text/css" href="./mao.css">
</head>
<body>
	<div id='mao' class='mao'>test</div>
	<script type="text/javascript">
		var div = document.getElementById('mao');
		//mao.style.width = '300px'; 
		console.log(mao.style.width);   // 空串儿
		console.log(getComputedStyle(mao,false)['width']);  // 20px
	</script>
</body>
</html>

```

css代码：
```
.mao{
	width:20px;
	height:20px;
	transform:rotate(30deg);
}
```

我们的css样式是使用外链的方式通过class添加的，这种情况下style不能访问到width，是为什么呢？我们不妨测试一下，逆向思维，看看通过style设置的width是添加在哪个地方的，解除注释的那一行代码，查看页面，果然不出猫猫所料，就是添加在行内了。总结：style只能访问行间的样式（以及在访问之前通过style方式添加的样式），style标签内的样式和外链方式添加的样式它都不能访问。而getComputedStyle()方法却可以完美访问(这里说明一下，猫猫开发主要是使用chrome浏览器！)，接下来猫猫来看看为什么这个大哥这么厉害。


### getComputedStyle
查css属性最先想到的应该是去w3c，结果只得到这样一句话：
>一个 HTMLElement 的 style 属性是一个可读可写的 CSS2Properties 对象，就好像 CSSStyleRule 对象的 
style 属性一样。不过，Window.getComputedStyle() 的返回值是一个 CSS2Properties (CSS2Properties 
对象是所有 CSS2 属性及其值的集合。)对象，其属性是只读的。


### getComputedStyle和currentStyle
getComputedStyle和currentStyle的作用是一样的，只是针对的浏览器不同而已：
>currentStyle => ie 
getComputedStyle => ff & chrome

所以猫猫在写代码的时候需要写上兼容性判断：
```
obj.currentStyle ? obj.currentStyle : window.getComputedStyle(obj,false)['attr']	

```

## 结语
关于getComputedStyle属性还有很多需要深入学习的，比如说它的不同attr的返回值，很有意思的，查看猫猫的另一篇css文章吧！

