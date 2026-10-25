// Provider interface (contract). PiTrace core does NOT depend on any provider.
// A provider is responsible for fetching raw transaction data from a source.
// Core only interprets what the provider supplies.

/**
 * @typedef {Object} Provider
 * @property {string} name - Provider name (e.g. "mock", "horizon", "pi-explorer")
 * @property {(txHash: string) => Promise<object>} fetchTransaction - Fetch raw tx data. Must return a plain object or throw.
 */

/**
 * Validate that an object looks like a Provider.
 * @param {any} p
 * @returns {boolean}
 */
export function isProvider(p) {
  return (
    p !== null &&
    typeof p === "object" &&
    typeof p.name === "string" &&
    typeof p.fetchTransaction === "function"
  );
}

/**
 * A no-op mock provider for tests and offline use.
 */
export const mockProvider = {
  name: "mock",
  async fetchTransaction(txHash) {
    return {
      hash: txHash,
      status: "success",
      amount: "1.0",
      asset: "PI",
      fee: "0.01",
      network: "testnet",
      source: "mockProvider"
    };
  }
};
