---
category:javascipt
title:数组方法reduce的巧用
---
原生js中有很多很棒的数组方法，只是因为不兼容ie9以下的浏览器一直没有被广泛使用，但是对于兼容性要求不高的场景，我们的数组方法还是可以发挥大作用的，这里以reduce方法为例，猫猫也是吃了一惊。接下来直接讲reduce的使用场景
## 检查字符串中每个字母出现的次数
通常情况下我们考虑用遍历数组的方式，这里reduce提供更好的解决方案，代码如下：
```
var str = 'aaaakkskdlvjjffn';
str.split('').reduce(function(res,cur){
	res[cur] ? res[cur] ++ : res[cur] = 1
	return res;
},{})
```
直接打开控制台就能检验是不是正确，简直厉害了，猫猫。

## 给数组的每一项加一
这种情况也不难理解，正常遍历数组轻松可以达到目的，这里reduce也提供解决方案：
```
var arr = [1,2,3,4,5];
arr.reduce(function(res,cur){
	res.push(cur + 1);
	return res;
},[])
```
看吧，轻松成功，再也不用写for了。

## 数组的各项求和
求和就更简单了：
```
var arr = [1,2,3,4,5];
arr.reduce(function(res,cur){
	res += cur;
	return res;
},0)
```
理解这些以后觉得数组方法太厉害了，简直想把所有的数组方法都拿来研究一下，哈哈，稍等，这里应该先弄懂reduce
## reduce参数介绍
reduce方法接收一个回调函数和一个参数，reduce的第二个参数可以设置回调函数的第一个参数的类型和初始值。