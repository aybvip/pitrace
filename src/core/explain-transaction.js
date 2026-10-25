function hasValue(v) {
  return v !== null && v !== undefined && v !== "";
}

export function explainTransaction(tx) {
  if (tx === null || typeof tx !== "object" || Array.isArray(tx)) {
    throw new TypeError("Transaction data must be a plain object.");
  }

  // Allow callers to pass either raw input or a normalized result
  const data =
    tx && tx.transaction && typeof tx.transaction === "object"
      ? tx.transaction
      : tx;

  const explanations = [];

  // --- hash ---
  if (hasValue(data.hash)) {
    explanations.push({
      field: "hash",
      label: "Transaction identifier",
      value: String(data.hash),
      source: "input.hash"
    });
  } else {
    explanations.push({
      field: "hash",
      label: "Transaction identifier",
      value: null,
      note: "Not provided in the source data."
    });
  }

  // --- status ---
  if (data.status === "success") {
    explanations.push({
      field: "status",
      label: "Result",
      value: "The source reports success.",
      source: "input.status"
    });
  } else if (data.status === "failed") {
    explanations.push({
      field: "status",
      label: "Result",
      value: "The source reports failure.",
      source: "input.status"
    });
  } else {
    explanations.push({
      field: "status",
      label: "Result",
      value: "Unknown or unavailable",
      note: "No verified status was supplied."
    });
  }

  // --- amount ---
  if (hasValue(data.amount)) {
    explanations.push({
      field: "amount",
      label: "Amount",
      value: String(data.amount),
      unit: hasValue(data.asset) ? String(data.asset) : "Unspecified asset",
      source: "input.amount"
    });
  } else {
    explanations.push({
      field: "amount",
      label: "Amount",
      value: null,
      note: "Not provided in the source data."
    });
  }

  // --- fee ---
  if (hasValue(data.fee)) {
    explanations.push({
      field: "fee",
      label: "Transaction fee",
      value: String(data.fee),
      source: "input.fee"
    });
  } else {
    explanations.push({
      field: "fee",
      label: "Transaction fee",
      value: null,
      note: "Not provided in the source data."
    });
  }

  // --- network (optional) ---
  if (hasValue(data.network)) {
    explanations.push({
      field: "network",
      label: "Network",
      value: String(data.network),
      source: "input.network"
    });
  }

  // --- asset (optional, if not already attached to amount) ---
  if (hasValue(data.asset) && !hasValue(data.amount)) {
    explanations.push({
      field: "asset",
      label: "Asset",
      value: String(data.asset),
      source: "input.asset"
    });
  }

  // --- ledger (optional) ---
  if (hasValue(data.ledger)) {
    explanations.push({
      field: "ledger",
      label: "Ledger",
      value: String(data.ledger),
      source: "input.ledger"
    });
  }

  // --- memo (optional) ---
  if (hasValue(data.memo)) {
    explanations.push({
      field: "memo",
      label: "Memo",
      value: String(data.memo),
      source: "input.memo"
    });
  }

  // --- source (optional) ---
  if (hasValue(data.source)) {
    explanations.push({
      field: "source",
      label: "Data source",
      value: String(data.source),
      source: "input.source"
    });
  }

  // --- createdAt (optional) ---
  if (hasValue(data.createdAt)) {
    explanations.push({
      field: "createdAt",
      label: "Created at",
      value: String(data.createdAt),
      source: "input.createdAt"
    });
  }

  return {
    schemaVersion: "1.0.0",
    network: hasValue(data.network) ? String(data.network) : "unknown",
    explanations,
    limitations: [
      "A transaction alone does not prove the real-world identity of any party.",
      "A transaction alone does not prove the purpose of the payment.",
      "Status meaning depends on the data source; verify against the original source.",
      "PiTrace does not connect to any network; it interprets only the data you supply."
    ],
    disclaimer:
      "Interpretation is based only on supplied data; verify it against the original source."
  };
}
