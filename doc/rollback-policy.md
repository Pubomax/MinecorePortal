# Rollback Policy

## Policy
All changes must have a rollback point **before** edits begin.

### Code Changes (Required)
- **Git checkpoint commit required** before any code change.
- The checkpoint commit must be referenced in [`doc/changelog.md`](doc/changelog.md:1) and [`laststep.md`](laststep.md:1).

### Documentation‑Only Changes
- Git checkpoint commit recommended but optional.
- If no commit is created, note “Documentation‑only change; no rollback commit required.” in [`laststep.md`](laststep.md:1).

### If Git Is Not Available
- Create `./rollback/<timestamp>/` with:
  - patch/diff files
  - notes on what changed
  - evidence (logs/screenshots if applicable)

## Enforcement
- No work proceeds without a rollback reference.
