const compound = new Set(("淳于 叱干 东方 东野 第五 端木 公冶 皇甫 令狐 梁丘 闾丘 慕容 欧阳 濮阳 漆雕 上官 申屠 司马 司徒 太史 澹台 西门 相里 轩辕 夏侯 鲜于 宇文 完颜 尉迟 诸葛 颛孙 仲长 北堂 主父 叱利 女娲 南宫 司空 独孤 钟离 百里").split(" "));

export function parseLexicon(text) {
  const scores = new Map();
  const serialized = text.includes("GENDER_GUESSER_LEXICON");
  const pattern = serialized
    ? /s:\d+:"(\p{Script=Han})";d:([^;]+);/gu
    : /(?:^|[,\r\n])(\p{Script=Han}),([^,\r\n]+)/gu;
  for (const [, character, value] of text.replace(/^\uFEFF/, "").matchAll(pattern)) {
    const score = Number(value);
    if (!value.trim() || !Number.isFinite(score) || score < 0 || score > 1) {
      throw new Error("字表含无效分数。");
    }
    if (!scores.has(character)) scores.set(character, score);
  }
  if (!scores.size) throw new Error("没有读到汉字与分数，请选择原始字表。");
  return scores;
}

export function estimate(name, scores) {
  const chars = Array.from(name);
  if (!/^\p{Script=Han}{2,20}$/u.test(name)) {
    return {note: "请输入由汉字组成的中文全名（含姓氏）。"};
  }
  const given = chars.slice(compound.has(chars.slice(0, 2).join("")) ? 2 : 1);
  if (!given.length) return {note: "没有可用于估计的名字用字。"};
  const used = given.slice(0, 2);
  const missing = used.filter(char => !scores.has(char));
  if (missing.length === used.length) return {note: "名字用字未收录。"};
  const values = used.map(char => scores.get(char) ?? 0.5);
  const score = values.length === 1 ? values[0] : 0.449 * values[0] + 0.551 * values[1];
  const notes = [];
  if (missing.length) notes.push("未收录：" + missing.join("、") + "（按 0.5 代入）");
  if (given.length > 2) notes.push("只用名字前两个字");
  return {score, note: notes.join("；") || "—"};
}

export function splitNames(value) {
  return value.split(/[;；\r\n]+/u).map(name => name.trim()).filter(Boolean);
}

if (typeof document !== "undefined" && document.getElementById("name-gender-demo")) {
  const get = id => document.getElementById(id);
  const file = get("name-lexicon"), run = get("name-run"), status = get("name-status");
  const table = get("name-results"), body = table.tBodies[0];
  const percent = new Intl.NumberFormat("zh-CN", {style: "percent", maximumFractionDigits: 1});
  let localLexicon, defaultLexicon, request = 0;
  const reset = get("name-reset-lexicon");
  run.disabled = false;
  function loadDefault() {
    defaultLexicon ??= fetch(new URL("../data/charlex_gender_full.txt", import.meta.url))
      .then(response => {
        if (!response.ok) throw new Error("默认字表暂时无法下载，请重试。");
        return response.text();
      })
      .then(parseLexicon)
      .catch(error => {
        defaultLexicon = undefined;
        throw error;
      });
    return defaultLexicon;
  }
  async function selectLexicon() {
    const current = ++request;
    localLexicon = undefined;
    run.disabled = true;
    table.hidden = true;
    body.replaceChildren();
    const selected = file.files[0];
    reset.disabled = !selected;
    if (!selected) {
      status.textContent = "使用默认字表。";
      run.disabled = false;
      return;
    }
    status.textContent = "正在读取字表…";
    try {
      if (selected.size > 2_000_000) throw new Error("字表文件过大。");
      const parsed = parseLexicon(await selected.text());
      if (current !== request) return;
      localLexicon = parsed;
      run.disabled = false;
      status.textContent = "自选字表已载入 " + parsed.size.toLocaleString("zh-CN") + " 个汉字。";
    } catch (error) {
      if (current === request) status.textContent = "无法载入字表：" + error.message;
    }
  }
  file.addEventListener("change", selectLexicon);
  reset.addEventListener("click", () => {
    file.value = "";
    selectLexicon();
  });
  run.addEventListener("click", async () => {
    const names = splitNames(get("name-input").value);
    body.replaceChildren();
    table.hidden = true;
    if (!names.length || names.length > 500) {
      status.textContent = names.length ? "每次最多查询 500 个姓名。" : "请输入至少一个姓名。";
      return;
    }
    const current = request;
    let lexicon = localLexicon;
    if (!lexicon) {
      run.disabled = true;
      status.textContent = "正在载入默认字表…";
      try {
        lexicon = await loadDefault();
      } catch {
        if (current === request) {
          status.textContent = "默认字表加载失败，请重试或选择本地字表。";
          run.disabled = false;
        }
        return;
      }
      if (current !== request) return;
      run.disabled = false;
    }
    for (const name of names) {
      const {score, note} = estimate(name, lexicon);
      const row = body.insertRow();
      for (const value of [name, score === undefined ? "—" : percent.format(score),
        score === undefined ? "—" : percent.format(1 - score), note]) {
        row.insertCell().textContent = value;
      }
    }
    table.hidden = false;
    status.textContent = "已处理 " + names.length + " 个姓名。";
  });
  get("name-copy").addEventListener("click", async () => {
    const citation = get("name-citation");
    const message = get("name-copy-status");
    try {
      const link = citation.querySelector("a");
      await navigator.clipboard.writeText(citation.textContent.replace(link.textContent, link.href));
      message.textContent = "已复制引用。";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      message.textContent = "已选中引用，可手动复制。";
    }
  });
}
