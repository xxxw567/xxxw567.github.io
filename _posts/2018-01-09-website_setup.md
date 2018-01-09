---
title: '网站建成'
date: 2018-01-09
permalink: /posts/2018/01/网站建成/
tags:
  - 日常
  - 建站
---

#前言 
终于搞好了个人网站，折腾了很久。
曾经尝试过很多个方案，包括使用WordPress自带的空间，但是老觉得后面有一连串的奇怪代码很难看，而且找一个合适的模板也很困难；也尝试使用狗爹购买域名然后租借阿里或者腾讯云服务器的打算，但是费用太昂贵的了。

所以最后决定还是在自己的GitHub上搭建个人网站和博客最为直接，而且是免费的。其实在这个阶段我也由很多选择，稍微在网上搜索一下发现有很多教程，包括GitHub+Jekyll, +hugo,+HEXO等多种方案。

之所以最后选择JekyII是因为找到了现成的[模板](https://github.com/academicpages/academicpages.github.io)，这个模板简单粗暴，而且有很多fancy的功能。所以直接fork了这个模板根据自己的情况加工了一下就算完成了。

#搭建过程 
其实很简单，直接forks模板到自己的GitHub仓库就行。过程及其简单。但是在个性化的时候略麻烦。所幸的是[academicpages](http://archive.is/3TPas)这个模板提供了一个参考，这个参考里面以Git的方式列举了大致需要改变的条目和范例。

搭建过程中由于原来的[academicpage模板](https://github.com/academicpages/academicpages.github.io)在生成publication，talk和teaching的列表的时候需要用户自己填一个tsv文件，然后再run一个Python程序就可以直接生成很多fancy功能的页面。但是一方面太麻烦了每次更新都要重新跑Python程序，另一方面生成的格式也不太简约，所以自己写了一个MD替换了里面原来的程序。

当然不得不承认[Jekyll](https://jekyllrb.com/)里面还有很多可以探索的东西。不过时间有限，匆忙搭建的网站兼博客基本功能实现了就行了。之后在慢慢折腾和优化吧。