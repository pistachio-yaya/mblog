---
category:javascript
title:cookie和session的区别
---
## 前言
最近一次面试中，提到cookie和session的区别，感觉自己没有答好，所以趁此机会好好的学习一下，希望以后能更清晰的理解。
## 从名称来看
cookie翻译过来是饼干，session翻译过来是会话。
## 存储的位置不同
cookie保存在客户端，session保存在服务端。所以从安全性的角度来说，session更加安全。但是session存放在服务器端，当访问增多时可能会影响到服务器的性能。
## 作用
cookie和session都可用来保存会话信息、记录用户状态。cookie更像是一个通行证令牌，session则是一个明细表。
## 大小不同
cookie有大小限制，可以设置过期时间，一个域下面最多有20条cookie，浏览器最多保存300条cookie，一条cookie的大小不超过4k。
## 如何获取cookie
cookie是document对象的一个属性，直接使用document.cookie就可以查看cookie。

