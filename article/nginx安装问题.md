---
category:nginx
title:nginx安装问题
---
## 前言
最近申请了一台centos的服务器，在安装nginx的时候遇到一些问题，顺便把它记录下来，以便自己完全的搞懂

## 问题
1.安装 yum install nginx

安装成功，查看版本也成功

2.启动 service nginx start
报错：
>Starting nginx: nginx: [emerg] socket() [::]:80 failed (97: Address family not supported by protocol)
                                                           [FAILED]

这里我们的解决方案是：修改配置文件，先cd到以下目录：
vim /etc/nginx/conf.d/default.conf
将
>listen       80 default_server;
listen       [::]:80 default_server;

改为：
>listen       80;
#listen       [::]:80 default_server;

3.再执行第二步命令
service nginx start 
>Starting nginx:                                            [  OK  ]

4.测试 wget http://127.0.0.1
>--2016-11-08 15:23:07--  http://127.0.0.1/
正在连接 127.0.0.1:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：3698 (3.6K) [text/html]
正在保存至: “index.html”
100%[======================================>] 3,698       --.-K/s   in 0s      
2016-11-08 15:23:07 (466 MB/s) - 已保存 “index.html” [3698/3698])

## 结语
以上解决问题。需探究原因。
