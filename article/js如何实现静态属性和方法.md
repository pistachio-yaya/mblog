---
title: javascript实现静态属性
tags: [javascript,笔记]
category: javascript
---

熟悉java，c++这些变成语言程序员都知道静态属性这一概念。
属性和方法是在对象的实例的基础上进行操作的，而静态属性和方法是在类的基础上进行操作的
而javascript中没有类的概念，也没有静态属性关键字。想要实现静态变量可以用闭包的方法
代码如下
```
var constructor = (function(){
	//静态变量num
	var num = 0;

	//真正的构造函数
	var construct =  function(name,sex,age){
		//构建作用域安全的对象
		if(this instanceof construct){
			this.name = name;
			this.sex = sex;
			this.age = age;
			//静态变量加一
			num++;
			if(num>10){
				throw new Error('constructor对象只能被创建10次')
			}
		}else{
			return new construct(name,sex,age);
		}
	}
	//返回构造函数
	return construct;
})();
```
在上面的代码中，constructor被赋值时，匿名函数执行，返回真正的构造函数。
匿名函数中的num变量存在于匿名函数的作用域中，由于真正的构造函数construct也在该作用域中定义。
所以每当实例化对象实例时，构造函数能够对匿名函数作用域中的num进行操作，从而达到类似静态变量的效果