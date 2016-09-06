---
title: 关于setTimeout
tags: [javascript,setTimeout,笔记]
category: javascript
---
## 1.setTimeout在做什么
刚开始学习javascript可能会觉得这是一个十分显而易见的问题，例如这样子的例子：
```
setTimeout(function() {
    alert('littlewords')
}, 1000);
```
第一印象也许会是1秒后执行alert('littlewords')，这在大多数情况下结果跟我们的直觉非常相近，但在下面这样的情况将会出现与直觉不符的结果
```
var a = 0;
setTimeout(function() {
    console.log(a);
}, 0);
a += 1;
```
>输出结果：1

what?发生了什么？为什么会是1？
要理解上面的输出结果首先要知道setTimeout并不是在n毫秒后执行传入的回调函数。在setTimeout被调用的时候，会有一个延时时间排入队列，然后运行之后的代码。等所有代码运行完毕后，javascript虚拟机才会来照顾一下队列中回调。
这样上面代码就很好理解了
>1step:声明并初始化变量a=0
2step:将回调function(){console.log(a)}推入延时队列
3step:a加1 
4step:执行回调

现在就很容易想清楚为什么下面代码最后的结果为什么会是100了
```
var a = 0;
function one(){
    for(var i = 0; i<10;i++){
        setTimeout(function(){
            a+=i;
        },0);
    }
}
function two(){
    alert(a);
}
one();
setTimeout(two,0);
```