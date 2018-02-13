[TOC]

# AngularJS + ES6 + UEditor

 - **搭建webpack+angular+es6基本开发结构**
 - **将UEditor封装为angular的directive**

# Get Started

 - 配置项目

 ```
 # 克隆
 git clone git@gitlab.com:yujinpan/ng-ueditor.git

 # 安装所需npm包
 cnpm install

 # 全局安装webpack
 cnpm install -g webpack
 ```

 - 配置`UEditor`资源：[UEditor-1.4.3.3下载地址](https://codeload.github.com/fex-team/ueditor/zip/v1.4.3.3)与[UEditor官网](http://ueditor.baidu.com/website/index.html)。

```
# 解压UEditor-1.4.3.3源码包
cd ueditor-1.4.3.3

# 安装所需npm包
cnpm install

# 全局安装grunt
cnpm install -g grunt

# 编译ueditor，生成打包文件
grunt
```

> 将编译后的UEditor-1.4.3.3项目下的`/dist/utf8-php`文件夹放到本项目的`/dist/lib`目录（需要创建）下，更改`utf8-php`文件夹名为`ueditor`，最终目录路经如下：

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

 
 - 运行测试案例

```
npm start
```
