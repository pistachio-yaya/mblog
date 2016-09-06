---
category: javascript
tags: [underscore,笔记]
title: 笔记
---

有这样一种写法
```
if(context === void 0) return func;
```
void是javascript中的一个函数，接受一个参数返回值永远都是undefined。可以说，使用void的目的就是为了得到javascript中的undefined。
```
void 0
void (0)
void hello
void (new Date())
```
以上都讲返回undefined,那么为什么不直接使用undefined
undefined并不是javascript的保留字，在一些环境下可以被赋值，这样就不能安全的得到undefined的值，例如
```
var undefined = 100;
console.log(undefined);
```

#### !!的作用
在javascript中，!null和!undefined都会产生TRUE的结果，所以!!就相当于取布尔值
```
!!null;//返回false
!!"2";//返回TRUE
```

arr.slice()
可以说实现对一个数组的拷贝，不错的技巧

## 继承
1.原形链继承
```
var father = {
    a : 1,
    b : 2,
};
var son = function(){
    this.c  = 3;
    this.d  = 4;
};
son.prototype  = father;
var test = new son();
console.log(test.a); // 1

```
2.构造函数继承
```
var gz1 = function(){
    this.a = 1;
    this.b = 2;
};
var yaya = new gz1;
var gz2 = function(){
    gz1.call(this);
    this.c =3;
    this.d = 4;
}
var ynyn = new gz2;

```
3.拷贝式继承

```
var extend = function(desObj,srcObj){
    for(var key in srcObj){
        if (Object.prototype.toString.call(srcObj[key]) == "[object Object]"){
            desObj[key] = {};
            desObj[key] = srcObj[key];
        }else if(Object.prototype.toString.call(srcObj[key]) == "[object Array]"){
            desObj[key] = [];
            desObj[key] = srcObj[key].slice();
        }else{
            desObj[key] = srcObj[key];
        }
    }
}
var b = [1,2,3,[4,5],{6:7,7:8}];
var a = [];
extend(a,b);

```
