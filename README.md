# PiTrace

> **Explain transactions, don't just display them.**

PiTrace is a small, evidence-first library that converts raw transaction data into a human-readable explanation. Every explained field is linked to the source field it came from. Missing data produces an explicit "not provided" note — never a guess.

**Not an explorer. Not an oracle. Not financial advice.**

[العربية](README.ar.md) · [GitHub](https://github.com/aybvip/pitrace)

## Why

Block explorers show you *what* is on chain. They rarely tell you *what it means*, and they almost never tell you *what cannot be concluded* from a transaction alone.

PiTrace fills that gap — honestly.

## What v0.1.0 does

- `normalizeTransaction(raw)` — validate and normalize input into a canonical shape
- `explainTransaction(tx)` — produce an evidence-linked explanation
- Multilingual glossary (AR / EN)
- Test fixtures + tests for missing/unknown data
- Zero dependencies

## What it does NOT do (by design)

- No direct Mainnet connection
- No identity inference ("who is this person?")
- No purpose inference ("why was this payment made?")
- No status guessing when data is missing
- No UI, no AI, no predictions

## Quick start

```bash
npm install
npm test
```

```js
import { explainTransaction } from "./src/core/explain-transaction.js";

const result = explainTransaction({
  hash: "example-transaction-hash",
  status: "success",
  amount: "12.5",
  asset: "PI",
  fee: "0.01",
  network: "testnet"
});

console.log(JSON.stringify(result, null, 2));
```

Or via CLI:

```bash
node bin/pitrace.js fixtures/payment.json
```

## Output shape

```json
{
  "schemaVersion": "1.0.0",
  "network": "testnet",
  "explanations": [
    { "field": "hash", "label": "Transaction identifier", "value": "example-transaction-hash", "source": "input.hash" }
  ],
  "limitations": [
    "A transaction alone does not prove the real-world identity of any party.",
    "A transaction alone does not prove the purpose of the payment.",
    "Status meaning depends on the data source; verify against the original source."
  ],
  "disclaimer": "Interpretation is based only on supplied data; verify it against the original source."
}
```

## Evidence rule

> Every explained value must carry a `source` pointing to the input field it came from. If a value is missing, the output says so explicitly. PiTrace never invents data.

## License

MIT
