#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { explainTransaction } from "../src/core/explain-transaction.js";

const arg = process.argv[2];

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

let raw;
if (!arg || arg === "-") {
  // read stdin
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (c) => (data += c));
  process.stdin.on("end", () => {
    try {
      raw = JSON.parse(data);
      run(raw);
    } catch (e) {
      fail("Invalid JSON on stdin: " + e.message);
    }
  });
} else {
  const file = path.resolve(arg);
  if (!fs.existsSync(file)) fail("File not found: " + file);
  try {
    raw = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    fail("Invalid JSON in file: " + e.message);
  }
  run(raw);
}

function run(raw) {
  try {
    const result = explainTransaction(raw);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    fail(e.message);
  }
}
