# Architecture

PiTrace is split into two layers:

## 1. Core (`src/core/`)
Pure functions. No I/O, no network, no side effects.

- `normalize-transaction.js` — validates and normalizes input
- `explain-transaction.js` — produces evidence-linked explanations

## 2. Providers (`src/providers/`)
Responsible for fetching raw data. Core does NOT depend on providers.

- `provider-interface.js` — contract + mock provider

## Data flow

```
raw input  ->  normalizeTransaction()  ->  canonical tx  ->  explainTransaction()  ->  explanation
```

## Evidence rule

Every explained value carries a `source` pointing to the input field. Missing values produce an explicit note, never a guess.
