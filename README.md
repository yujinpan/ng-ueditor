[TOC]

# AngularJS + ES6 + UEditor

 - **搭建webpack+angular+es6基本开发结构**
 - **将UEditor封装为angular的directive**

# Get Started

 - 在本地目录执行：`git clone git@gitlab.com:yujinpan/ng-ueditor.git`。

 - 下载`UEditor`源码：<br>[UEditor-1.4.3.3下载地址](https://codeload.github.com/fex-team/ueditor/zip/v1.4.3.3)与[UEditor官网](http://ueditor.baidu.com/website/index.html)。
 
 - 解压UEditor-1.4.3.3源码包，<br>在目录中使用`grunt`命令进行编译（[官网教程地址](http://fex.baidu.com/ueditor/#dev-bale_width_grunt)）。
 
 - 将编译后的UEditor-1.4.3.3项目下的`/dist/utf8-php`文件夹放到本项目的`/dist/lib`目录（需要创建）下，
   <br>更改`utf8-php`文件夹名为`ueditor`，
   <br>最终目录路经如下：
```
app
dist
├─lib
│  └─ueditor
│     ├─dialogs
│     ├─lang
│     ├─php
│     ├─themes
│     ├─third-party
│     ...
.gitignore
package.json
README.md
webpack.config.js
```

 
 - 最后在目录下运行
 ```
    // 安装所需包
    cnpm install

    // 运行测试
    npm start
 ```
