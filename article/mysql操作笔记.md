---
category:mysql
title:mysql操作笔记
---
## 前言
这段时间在windows server 2008部署一个java项目，其中数据库用的是Mysql，由此从零开始接触到了mysql数据库，就把一些操作流程写在这里吧，当作是以后一个好查询的地方，相信会对你有用

## 一、安装和运行mysql（针对windows）
根据自己的电脑操作系统选择合适的位数的 MySQL server 32/64位的下载到电脑，现在新版的mysql一般没有setup.exe启动程序了，这时我们可以从命令行启动，cmd打开DOS命令执行窗口，cd到你的mysql的安装路径的bin目录下，执行以下命令即可：
```
mysql -install      //以管理员身份运行
net start mysql     //启动mysql服务  
```
执行成功以后，可以进入mysql执行命令模式，如下：
```
mysql>
```
## 二、连接和管理root账户
##### 1.使用root账户连接mysql服务器
首次登录root账户，默认没有密码，直接enter就可以登录了
```
mysql -u root -p
```
##### 2.给root账户设置密码
```
mysqladmin -u root password mima123
```
##### 3.创建新用户
使用root用户连接到mysql服务器：
```
mysql -u root -p
```
创建新用户：
```
insert into mysql.user(Host,User,Password) values("ip","username",password("newcount_password");
```
刷新系统权限表：
flush privileges;
退出当前账户：
exit
用新的账户登录试试
mysql -u newcountname -p 

## 三、为用户授权
##### 1.使用root账户
```
mysql -u root -p
```
##### 2.授权
```
grant all privileges on one_database.* to newcount_username@newcount_ip identified by 'newcount_password';
```
##  四、查询mysql的监听端口
```
mysql-u root -p
show global variables like 'port';
```
## 五、导入sql脚本
```
mysql -u root -p
use database aim_database_name;
source xx.sql             //注意这里的sql脚本要写完整的路径
```