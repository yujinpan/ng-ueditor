[TOC]

# AngularJS + ES6 + UEditor

 - 搭建webpack+angular+es6基本开发结构
 - 将UEditor封装为angular的directive

# Get Started

 - 下载`UEditor`源码：[UEditor-1.4.3.3下载地址](https://codeload.github.com/fex-team/ueditor/zip/v1.4.3.3)与[UEditor官网](http://ueditor.baidu.com/website/index.html)。
 - 解压源码包在目录中使用`grunt`命令进行编译，[官网教程地址](http://fex.baidu.com/ueditor/#dev-bale_width_grunt)。
 - 将编译后的`/dist/`目录下utf8-php文件夹放到本项目的`/dist/lib`目录（需要创建）下，更改'utf8-php'文件夹名为'ueditor'。
 - 最后在目录下运行
 ```
    // 安装所需包
    cnpm install

    // 运行测试
    npm start
 ```
