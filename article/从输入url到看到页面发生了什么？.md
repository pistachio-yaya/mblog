---
category: javascript
tags: [web]
title: 从输入url到看到页面发生了什么
---

## 前言
小妹对web的理解还很粗浅，姑且挑战一下这道经典题目

## 1.浏览器生成http报文
当url输入到浏览器地址栏并且按下回车后，浏览器会根据我们输入的url生成一个http报文。
例如访问mm.littlewords.cn的时候会生成如下http报文
```
GET / HTTP/1.1
Host: mm.littlewords.cn
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
```

## 2.域名解析
得到这样一个报文之后激动的孩子们当然是想赶紧吧它寄出去。<br>
但是http协议是建立在传输层协议TCP协议之上的，TCP协议规定传输信息必须先在两台主机之间建立传输管道，<br>
而建立这个传输管道需要目标主机的IP地址和端口号。<br>
我们知道再不输入端口号的时候，浏览器会自动访问目的主机的80端口<br>
那么怎么获得目的主机的IP地址呢？这就要了解一下dns域名解析<br>
<br>
DNS（Domain Name System）直译就是域名系统的意思，最早互联网诞生的时候，并没有域名这个概念，那个时候都是直接用IP访问。但是IP虽然直接，但是缺点是很难记忆，不利于互联网的普及,于是就发明了DNS。<br>
DNS是用于管理域名和IP地址映射关系的分布式数据库，DNS使用UDP协议传输数据。

## 3.与服务器建立TCP连接

## 4.发送请求报文

## 5.返回响应报文

## 6.关闭连接，渲染页面
