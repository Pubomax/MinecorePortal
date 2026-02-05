# Architecture — Core Source Model

## Status
Draft (aligned to PRD v0; pending owner inputs).

## Target Architecture Diagram (text)
**CEO** → **Core Source Model (CSM)** → **Operational Single Source of Truth (SSOT)** → **Department Systems**

1) **Inputs**: Department data, workflows, and decision artifacts
2) **CSM Layer**: Diagnosis → Alignment → Integration → Stabilization
3) **SSOT**: Canonical metrics, ownership rules, and governance
4) **Outputs**: Decision flows, automated workflows, reporting & accountability

## Key Modules / Components
1. **Diagnosis Engine**: maps data divergence + decision bottlenecks.
2. **Alignment Layer**: defines SSOT, ownership, and decision flows.
3. **Integration Layer**: connects tools to enforce SSOT.
4. **Stabilization Layer**: governance, change control, and drift prevention.

## Data Flow & State Ownership
- **State Owner**: SSOT governs canonical definitions for KPIs and data ownership.
- **Flow**: Department sources → Diagnosis map → Alignment rules → Integration wiring → Stabilization policies.
- **Output**: authoritative KPIs + decision traceability.

## Interfaces / Contracts
- **Diagnosis Output**: system map, conflict list, blind spots.
- **Alignment Output**: ownership matrix, metric definitions, decision flows.
- **Integration Output**: workflow map, automation spec, data consistency rules.
- **Stabilization Output**: governance charter, tool boundaries, change control.

## Storage Choices
- Conceptual SSOT (tool-agnostic). Concrete storage TBD based on client stack.

## Security Considerations
- Data access requires CEO approval and controlled sharing.
- Governance defines access boundaries for cross‑departmental data.

## Scalability / Performance
- Scales via governance and process discipline; automation only after alignment.

## Risks & Tradeoffs
- **Risk**: Insufficient data access stalls Diagnosis.
- **Tradeoff**: Slower start (structure-first) in exchange for sustainable scale.

## Open Items
- Tooling stack selection (TBD by client environment).
- KPI definitions (TBD by owner inputs).

---

# Architecture — Website Bold Refresh (Home Only)

## Target Architecture Diagram (text)
**Hero (Bold)** → **Step 1: Diagnosis** → **Step 2: Alignment** → **Step 3: Integration** → **Step 4: Stabilization** → **Booking CTA**

## Key Modules / Components (Home)
- **Hero Block**: large headline + compressed subcopy + primary CTA.
- **Chronology Sections**: numbered steps with minimal text.
- **Persistent CTA**: sticky or repeated CTA ensuring ≤3 clicks to booking.
- **Funnel Navigation**: anchor‑based nav reflecting chronology.

## Data Flow & State Ownership
- Stateless UI. No new data sources required.
- Booking CTA routes to existing consultation flow.

## Interfaces / Contracts
- Anchors for section navigation.
- CTA to existing booking modal/page.

## Design System Implications
- Increased typography scale on hero.
- Reduced body copy density per section.

## Risks & Tradeoffs
- Over‑compression may reduce clarity if not tested.
- Bold styling must preserve readability and trust.
