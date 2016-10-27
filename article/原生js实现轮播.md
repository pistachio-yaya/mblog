---
category:javascript
title:js原生实现轮播的小栗子
---
## 前言
此示例采用原生的js，涉及opacity和setInterval定时器，在参考代码之前，你可以根据这个思路先自己去尝试实现一下，毕竟不同的人会有不同的实现方法

## 栗子
以猫猫博客首页的轮播为例，图片部分可以自己解决，只要将路径写清楚就不会有问题了。以下为代码部分：
```
<!DOCTYPE html>
<html>
<head>
	<title>slider</title>
	<style type="text/css">
		.imgContainer{
			width:40%;
			height:100%;
			position:fixed;
			right:0px;
		}
		img{
			width:100%;
			height:100%;
			display:inline;
			float:left;
			position:absolute;
			opacity: 0;
		}
		.active{
			opacity:1;
		}
	</style>
</head>
<body>
	<div class="imgContainer" id="imgContainer">
		<img src="./IMG_2196.jpg">
		<img src="./IMG_2200.jpg">
	</div>
	<script type="text/javascript">
		var imgContainer = document.getElementById("imgContainer");
		var imgList = imgContainer.getElementsByTagName("img");

		var active_img = imgList[0];
		active_img.className = 'active';

		var i = 0 ;
		var len = imgList.length - 1;

		var autoPlay = function(i){
			if(i >= len){
				active_img = imgList[0];
				imgList[len].className = '';
				imgList[0].className = 'active';
			}else{
				active_img = imgList[i+1];
				imgList[i].className = '';
				imgList[i+1].className = 'active';
			}
		}
		setInterval(function(){
			autoPlay(i);
			if(i < len){
				i++;
			}else{
				i = 0;
			}
		},3000)
	</script>
</body>
</html>

```
这只是一个小例子，猫猫会继续努力，写出更好的代码。