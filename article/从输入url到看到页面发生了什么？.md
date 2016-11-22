---
category: javascript
tags: [web]
title: 从输入url到看到页面发生了什么
---

## 前言
猫猫对web的理解还很粗浅，姑且挑战一下这道经典题目，后面也会一直尽力去完善它。

## 1.查看缓存
当我们在地址栏输入url之后，浏览器要做的第一件事就是查看缓存，检查是否新鲜，如果缓存中的资源是新鲜的，直接展示，如果没有缓存才进入下一步解析url。

## 2.解析url
解析url，得到主机、协议、端口、path，如果输入的是域名，则是做DNS解析。
http协议是建立在传输层协议TCP协议之上的，TCP协议规定传输信息必须先在两台主机之间建立传输管道，<br>
而建立这个传输管道需要目标主机的IP地址和端口号。<br>
我们知道再不输入端口号的时候，浏览器会自动访问目的主机的80端口<br>
那么怎么获得目的主机的IP地址呢？这就要了解一下dns域名解析<br>
<br>
DNS（Domain Name System）直译就是域名系统的意思，最早互联网诞生的时候，并没有域名这个概念，那个时候都是直接用IP访问。但是IP虽然直接，但是缺点是很难记忆，不利于互联网的普及,于是就发明了DNS。<br>
DNS是用于管理域名和IP地址映射关系的分布式数据库，DNS使用UDP协议传输数据。

## 3.组装http请求报文
组装http请求报文要用到上一阶段中的ip和端口等信息
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

## 4.使用tcp协议与ip建立一个socket连接
TCP三次握手后建立连接。

## 5.发送http请求
连接建立之后，浏览器向目标ip发送http请求。
到次为止第一阶段的工作都是由浏览器端完成的接下来介绍服务器端要做的第二阶段的工作。


## 6.收到http请求
服务器收到http请求后解析请求，将请求转发到对应的服务器程序。

## 7.指定对应服务器程序处理http请求
服务器收到请求后检查请求头中是否包含缓存验证信息，如果包含且验证缓存新鲜则返回304等对应的状态码。

## 8.组装响应报文
服务器读取完整的请求报文，组装响应报文。
例如：
```
HTTP/1.1 200 OK
Connection:keep-alive
Content-Encoding:gzip
Content-Type:text/html; charset=utf-8
Date:Tue, 22 Nov 2016 05:51:58 GMT
ETag:W/"1944-bhh1JtoQMDvMP/QR7YF/+w"
Server:nginx/1.8.0
Transfer-Encoding:chunked
X-Powered-By:Express
```
到这里第二阶段也成功了，现在工作又转到了浏览器这里。来看看第三阶段发生了什么吧。

## 9.根据收到的响应报文选择处理方式及是否关闭TCP连接
服务器将组装好的响应报文通过tcp连接发送回浏览器，浏览器根据情况选择是否关闭tcp连接；根据状态码是否为特殊，如果特殊则做特殊处理；如果资源可缓存则缓存；如果资源经过Gzip等编码，则对资源进行解码。如果状态码为200且收到的响应资源为为html文档，则进入下一阶段。

## 10.html解析、渲染页面
了解html解析的整个过程是激动人心的，大致分为：构建DOM树、下载资源、构建CSS规则树、执行脚本。（注意：这里没有说先后顺序）这里猫猫主要目标在js的解析上，先说一下document.readyState的几个状态值，这个也是猫猫之前不知道的，还要感谢电面的面试官问到我，才让我有机会知道。document的readyState有四个值，依次是：
>uninitialized - 还未开始载入
loading - 载入中
interactive - 已加载，文档与用户可以开始交互
complete - 载入完成


现在我们就来看看这几个阶段时浏览器都干了什么。浏览器拿到html文档后，先创建一个document对象然后解析html，将解析到的元素和文本节点添加到文档中，readyState变为loading。html遇到script标签后，先检查是否defer和async字段，如果没有直接将它们天假到文档中并开始执行（这些脚本是同步执行的，下载和执行过程中解析器暂停）；如果有async属性则开始下载脚本并继续解析文档，脚本下载完成后尽快执行，当文档完成解析后，readyState变成interactive。defer属性的脚本按序zhixing，document对象上出发DOMContentLoaded事件，文档完全解析，浏览器继续加载图片内容，待图片加载完成、所有的defer脚本加载和执行后，readyState变为complete，这时window对象上触发load事件。

## 结语
ok,十全十美，完美了，这样我们访问的整个过程就清晰了，是不是收获很多，猫猫也是惊叹，捋清楚这些不容易啊！

