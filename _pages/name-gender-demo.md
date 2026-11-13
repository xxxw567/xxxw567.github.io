---
layout: archive
title: 中文姓名性别估计 / Name-based Gender Estimation
permalink: /research/name-gender-demo/
author_profile: false
---

这是基于研究配套 R 代码的演示。分数反映姓名用字在字表中的统计关联，不代表个人的实际性别，也不是针对个人的校准概率。请勿将结果用于身份核验或对个人作出决定。

1. 选择本地字表（支持原始 charlex_gender_full.txt 或 charlex_gender_full.lex）。文件和姓名只在浏览器里处理，本工具不会上传或保存它们。
2. 输入一个中文全名，或用中文分号「；」、英文分号「;」或换行分隔多个姓名。

<div id="name-gender-demo">
  <p><label for="name-lexicon">字表文件</label><br>
  <input type="file" id="name-lexicon" accept=".txt,.lex,.csv"></p>
  <p><label for="name-input">姓名</label><br>
  <textarea id="name-input" rows="4" maxlength="10000" placeholder="例如：李若男；欧阳晓芳"></textarea></p>
  <p><button type="button" class="btn" id="name-run" disabled>计算分数</button></p>
  <p id="name-status" role="status">请先选择本地字表。</p>
  <div style="overflow-x: auto">
    <table id="name-results" hidden>
      <caption>姓名用字的模型分数</caption>
      <thead><tr><th scope="col">姓名</th><th scope="col">男性关联分数</th><th scope="col">女性关联分数</th><th scope="col">说明</th></tr></thead>
      <tbody></tbody>
    </table>
  </div>
</div>

### 使用本工具请引用 / Suggested citation

<p id="name-citation">Xia, Y., Cai, T., &amp; Zhong, H. (2019). Effect of judges’ gender on rape sentencing: A data mining approach to analyze judgment documents. <i>The China Review, 19</i>(2), 125–149. <a href="https://cup.cuhk.edu.hk/chinesepress/journal/CR19.2/CR19.2_125-149.pdf">出版社原文</a></p>
<p><button type="button" class="btn" id="name-copy">复制引用</button> <span id="name-copy-status" role="status"></span></p>

### 计算方法

先按 R 代码的姓氏表去掉复姓，否则去掉第一个字。单字名直接查表；两个及以上的名字用字按原代码只取前两个，权重分别为 0.449 和 0.551。单个缺失用字按 0.5 代入；如果使用的字全部未收录，就不显示分数。女性关联分数为 1 减男性关联分数。

本页演示配套 R 函数的计算方式，不是对论文中完整分类流程的复现。

<noscript><p>本演示需要启用 JavaScript。</p></noscript>
<script type="module" src="{{ '/assets/js/name-gender-demo.mjs' | relative_url }}"></script>
