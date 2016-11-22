---
category:javascript
title:pubsub原生实现
---
猫猫对这个名字其实不太喜欢，所以这里就任性的只写不扩展了，喵～
```
var eventCenter = {};
eventCenter.eventStore = {};
eventCenter.trigger = function(event) {
	var eventList = this.eventStore[event];
	if (eventList && eventList.length) {
		eventList.forEach(function(handler) {
			handler();
		})
	}
}
```

```
eventCenter.on = function(event, callback) {

	// 检查回调函数是否为函数
	if(Object.prototype.toString.call(callback) != '[object Function]') {
		return;
	}

	if(this.eventStore[event] == undefined) {
		this.eventStore[event] = [];
	}
	
	var eventList = this.eventStore[event];
	eventList.push(callback);
}
```