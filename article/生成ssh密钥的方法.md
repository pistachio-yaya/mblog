---
category:Node
title:生成ssh密钥的方法
---

考虑是 windows系统还是linux系统
## 1.查看本机是否拥有ssh密钥
使用命令：cd ~/.ssh

## 2.生成shell运行环境（在window下需要这一步，linux下不需要）
使用命令：git bash

## 3.生成rsa类型的密钥并填写邮箱地址
使用命令：ssh-keygen -t rsa -C "your email"

## 4.根据提示输入密钥存放地址
如果不输入，则按照默认地址存放

## 5.设置密码，enter则不设置
可以不设置密码

## 6.得到id_rsa.pub公钥文件
得到的id_rsa为私钥文件，不能泄露
 


