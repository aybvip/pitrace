# Data Sources

PiTrace v0.1.0 does NOT connect to any network.

- Input is supplied by the caller (JSON).
- A future provider may fetch from a real source, but core stays independent.
- Before adding any real provider, verify the actual API shape against the Pi/Stellar documentation.

## Candidate sources (not yet integrated)

- Pi Explorer (public transaction pages)
- Stellar Horizon (reference model)
- Pi RPC (when publicly documented)

All integrations must be verified against the real API before merging.
