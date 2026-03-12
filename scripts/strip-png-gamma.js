#!/usr/bin/env node
/**
 * 剥掉 public/ 下所有 PNG 的 gAMA chunk
 * macOS 截图自带 gAMA，浏览器处理方式不同会导致偏灰
 * 构建前自动执行一次即可
 */
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const SKIP_CHUNKS = new Set(["gAMA"]);

function stripChunks(filePath) {
  const data = fs.readFileSync(filePath);
  const sig = data.subarray(0, 8);
  let pos = 8;
  const kept = [sig];
  let stripped = false;

  while (pos < data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.subarray(pos + 4, pos + 8).toString("ascii");
    const chunkEnd = pos + 12 + len;

    if (SKIP_CHUNKS.has(type)) {
      stripped = true;
    } else {
      kept.push(data.subarray(pos, chunkEnd));
    }
    pos = chunkEnd;
  }

  if (stripped) {
    fs.writeFileSync(filePath, Buffer.concat(kept));
    console.log(`  stripped: ${path.basename(filePath)}`);
  }
}

const pngs = fs
  .readdirSync(PUBLIC_DIR)
  .filter((f) => f.toLowerCase().endsWith(".png"));

if (pngs.length === 0) {
  console.log("no PNG files in public/");
} else {
  pngs.forEach((f) => stripChunks(path.join(PUBLIC_DIR, f)));
  console.log(`done, checked ${pngs.length} file(s)`);
}
