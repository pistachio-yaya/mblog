---
category: javascript
tags: [javascript,异步,pubsub]
title: javascript异步编程的4种方式
---
## 前言
javascript由于其单线程的特性，需要采用异步编程的方式来解决由于耗时操作阻塞线程导致'白屏死机'等问题。下面我们来看一下异步编程的四种实现方式。
## 1.回调
```html
func1();
func2();
func3();
```
如上面代码，三个函数将按照顺序执行，func2等待func1执行完毕后执行，func3等待func2执行完毕后执行。这一切都非常的美好，事情有条不紊的进行着...
然而当func2是一个耗时操作的时候，这一切似乎变得不那么赏心悦目。func3将苦苦的等候func2试行完毕，但并不需要func2的执行结果。这在很大程度上造成了时间上的浪费。就像是很多人排着队共用一个厕所位，并不需要前一个人在里面产生的结果，而只需要他占用的坑位，偏偏这是一位便秘的仁兄，于是后面的人个个都憋的绿了脸。
那么为什么javascript"不在厕所里面多安几个马桶"？当然是为了修的跟别家的厕所不同(请不要喷我，我只是习惯了逗而已)
好，上面的问题都不重要，线程虽然只有一条，但是得益于异步编程的方式，在排队秩序上更下功夫也让javascript兵贵神速。我们那些耗时操作写到回调里面去，向下面这样
```
function func1(callBack){
	setTimeout(callBack,0);
}
func1(func2);
func3();
```
这样耗时操作func2将不再阻塞线程，而是被推入延时队列，等待线程空闲的执行。
优点：简单、容易理解和部署
缺点：不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程很混乱

## 2.监听
另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
例如
```
func1.onEvent = fucn2;
```
这里用了类似浏览器事件的写法，不过事件驱动并不是狭义的浏览器事件，可以将他理解成something happened即一些"有趣的事情"发生了。func2受到已绑定的事件的驱动，当事件被激活的时候执行func2
优点:容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，"去耦合"（Decoupling），有利于实现模块化。
缺点:流程不清晰

## 3.PubSub模式
如上面提到的事件驱动，形如
```
func1.onEvent = func2;
```
一目了然，似乎非常完美，优雅动人并且与其他语言相比别具一格。但当被驱动的函数增加时，一切就变得不那么美好
```javascript
func1.onEvent = function(){
	func2.apply(this,arguments);
	func3.apply(this,arguments);
	func4.apply(this,arguments);
	func5.apply(this,arguments);
}
```
这不仅冗长重复，而且会制造出浮肿的处理器函数。来看一下发布/订阅模式如何解决问题的。
(以node的EventEmitter对象为例)
事件订阅过程subscribe：
```
emitter.on('somethingIntresting',func)
```
事件发布publish：
```
emitter.emit('somethingIntresting')
```
emittet.emit发布了前面订阅的事件，从而触发了func的执行。其本质还是事件驱动。但却明显优于后者。
他很容易添加处理函数，且完全不用担心处理函数的接踵而至而产生出的踩踏事件。

## 4.promise(待续...)
