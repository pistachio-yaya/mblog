---
category:CSS
title:css3-animation使用示例
tag:css3
---

## CSS3的animation属性
上班的时候无意中看到百度商桥的首页和产品介绍页觉得很棒,是animation的典型使用示例,所以便自己写来试试,感觉自己棒棒哒!
## 简介animation属性
animation: name duration timing-function delay iteration-count direction;
animation属性是一个简写属性,用于设置六个动画属性:
* animation-name
* animation-duration
* animation-timing-function
* animation-delay
* animation-iteration-count
* animation-direction

## 例子
没有例子就不足以说明问题,废话不多说,下面就上干货

![move picture](/images/dots.gif)

## 代码块
```
<!DOCTYPE html>
<html>
<head>
	<title>animation</title>
	<style type="text/css">
		.part{
			background:url(./product-feature-6.png) no-repeat;
			position:absolute;
			display:block;
		}
		.bg{
			width:371px;
			height:234px;
			background-position:-5px -5px;
		}
		.dots{
			width:167px;
			height:7px;
			top:140px;
			left:168px;
			background-position:-5px -249px;
			animation:dots 3s ease-in 0s infinite;
			-webkit-animation: dots 3s ease-in 0s infinite;

		}
        @keyframes dots
			{
			0%   {width:0px;}
			25%  {width:57px;}
			50%  {width:107px;}
			100% {width:167px;}
			}
	</style>
</head>
<body>
	<div>
		<div class="part bg"></div>
		<div class="part dots"></div>
	</div>
</body>
</html>
```

不是很难,可自行领悟...



