---
category:javascript
title:js原生实现计数器
---

## js原生实现计数器，我们可以考虑使用闭包来实现，很简单，看代码：
```
function counter(){
	var count = 0;
	return function b(){
		return ++ count;
	}
}
```
执行以上代码，发现不行啊，每次输出都是1，这是猫猫最先想到的办法，相信你也是，明显不行，看看是什么原因，每次count都被初始化了，我们应该只初始化count一次。那么这样写试试看：
```
function counter(){
	var count = 0;
	this.increase = function(){
		++ count;
		return count;
	}
}
var a = new counter;
a.increase();
```
ok,调用a.increase(),确实可以得到想要的结果了，这样我们的计数器就成功了，是不是很厉害。
