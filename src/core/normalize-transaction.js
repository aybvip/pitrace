export function normalizeTransaction(raw) {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError("Transaction data must be a plain object.");
  }

  const knownFields = [
    "hash",
    "status",
    "amount",
    "asset",
    "fee",
    "network",
    "ledger",
    "memo",
    "source",
    "createdAt"
  ];

  const transaction = {};
  const issues = [];

  for (const field of knownFields) {
    if (Object.prototype.hasOwnProperty.call(raw, field)) {
      transaction[field] = raw[field];
    } else {
      transaction[field] = null;
      issues.push({
        field,
        kind: "missing",
        note: `Field "${field}" was not provided in the input.`
      });
    }
  }

  // Preserve unknown fields without dropping them (honesty: don't silently ignore)
  for (const key of Object.keys(raw)) {
    if (!knownFields.includes(key)) {
      transaction[key] = raw[key];
      issues.push({
        field: key,
        kind: "unknown",
        note: `Field "${key}" is not part of the known schema; preserved as-is.`
      });
    }
  }

  return { transaction, issues };
}
