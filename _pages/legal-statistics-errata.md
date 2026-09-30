---
layout: archive
title: 司法统计学教材勘误
permalink: /teaching/legal-statistics-errata/
author_profile: true
published: true
---

本页面整理《司法统计学》教材出版后收到的读者反馈及勘误信息，并将持续更新。

This page records corrections and clarifications to the textbook *Legal Statistics*. It will be updated as additional errors are identified and verified.

Errata
======

| 章节 / 页码 | 原文或位置 | 更正内容 | 说明 |
| --- | --- | --- | --- |
| 第 171 页 | 例题中“根据题设条件已知 `N = 100 000`，`1 − α = 0.95`，`Δ = 1`” | `Δ = 1` 应改为 `Δ = 2` | 题目要求允许误差不大于 2 个月；公式中的分母为 `2²`，因此样本量 `n ≈ 807` 无需修改。 |
| 第 190 页，表 9.1 左下格 | 正确地拒绝原假设（`1 − β`） | 应改为“正确地接受原假设（`1 − α`）” | 该格对应 `H₀` 为真且接受 `H₀` 的情形。 |
| 第 267 页，式（14.4）后系数解释 | 将 `b₁`、`b₂` 分别直接解释为刑事与民事、民事与行政案件上传率之差 | 应改为：`b₀` 为三类案件上传率的总体均值；`b₁` 表示刑事案件上传率均值与总体均值之差（`b₁ = 刑事案件均值 − 总体均值`）；`b₂` 表示总体均值与行政案件上传率均值之差（`b₂ = 总体均值 − 行政案件均值`） | 这里的 `b₁`、`b₂` 都是某类案件均值与总体均值之间的差异，不是两类案件均值的直接差。 |
