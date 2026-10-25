import test from "node:test";
import assert from "node:assert/strict";
import { explainTransaction } from "../src/core/explain-transaction.js";
import { normalizeTransaction } from "../src/core/normalize-transaction.js";

test("explainTransaction throws on non-object input", () => {
  assert.throws(() => explainTransaction(null), TypeError);
  assert.throws(() => explainTransaction("str"), TypeError);
  assert.throws(() => explainTransaction([]), TypeError);
});

test("explainTransaction returns schemaVersion 1.0.0", () => {
  const r = explainTransaction({ hash: "h", status: "success" });
  assert.equal(r.schemaVersion, "1.0.0");
});

test("known status 'success' reports source", () => {
  const r = explainTransaction({ hash: "h", status: "success", amount: "1", fee: "0.01" });
  const st = r.explanations.find(e => e.field === "status");
  assert.equal(st.value, "The source reports success.");
  assert.equal(st.source, "input.status");
});

test("known status 'failed' reports source", () => {
  const r = explainTransaction({ hash: "h", status: "failed", amount: "1", fee: "0.01" });
  const st = r.explanations.find(e => e.field === "status");
  assert.equal(st.value, "The source reports failure.");
  assert.equal(st.source, "input.status");
});

test("unknown status yields 'Unknown or unavailable' without source", () => {
  const r = explainTransaction({ hash: "h", status: "pending" });
  const st = r.explanations.find(e => e.field === "status");
  assert.equal(st.value, "Unknown or unavailable");
  assert.equal(st.source, undefined);
  assert.ok(st.note);
});

test("missing hash yields null + note (no invention)", () => {
  const r = explainTransaction({ status: "success" });
  const h = r.explanations.find(e => e.field === "hash");
  assert.equal(h.value, null);
  assert.ok(h.note);
  assert.equal(h.source, undefined);
});

test("missing amount yields null + note (no invention)", () => {
  const r = explainTransaction({ hash: "h", status: "success" });
  const a = r.explanations.find(e => e.field === "amount");
  assert.equal(a.value, null);
  assert.ok(a.note);
});

test("every explained value with a value has a source", () => {
  const r = explainTransaction({
    hash: "h", status: "success", amount: "5", asset: "PI", fee: "0.01", network: "testnet"
  });
  for (const e of r.explanations) {
    if (e.value !== null && e.value !== undefined) {
      assert.ok(e.source, `field ${e.field} has value but no source`);
    }
  }
});

test("does not infer identity or purpose (limitations present)", () => {
  const r = explainTransaction({ hash: "h", status: "success" });
  const text = JSON.stringify(r.limitations);
  assert.match(text, /identity/);
  assert.match(text, /purpose/);
});

test("normalizeTransaction throws on non-object", () => {
  assert.throws(() => normalizeTransaction(null), TypeError);
  assert.throws(() => normalizeTransaction("x"), TypeError);
  assert.throws(() => normalizeTransaction([]), TypeError);
});

test("normalizeTransaction reports missing fields", () => {
  const { transaction, issues } = normalizeTransaction({ hash: "h" });
  assert.equal(transaction.hash, "h");
  assert.equal(transaction.status, null);
  const missing = issues.filter(i => i.kind === "missing");
  assert.ok(missing.length > 0);
});

test("normalizeTransaction preserves unknown fields", () => {
  const { transaction, issues } = normalizeTransaction({ hash: "h", foo: "bar" });
  assert.equal(transaction.foo, "bar");
  const unknown = issues.filter(i => i.kind === "unknown");
  assert.equal(unknown.length, 1);
});

test("explainTransaction accepts normalized result", () => {
  const norm = normalizeTransaction({ hash: "h", status: "success", amount: "1", fee: "0.01" });
  const r = explainTransaction(norm);
  assert.equal(r.explanations.find(e => e.field === "hash").value, "h");
});
