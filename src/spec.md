# Specification

## Summary
**Goal:** Deliver a clickable MVP prototype for MythOS Elite™ with four core modules, a premium theme, and persistent data so users can explore end-to-end workflows.

**Planned changes:**
- Build a responsive app shell (header + left navigation) with client-side navigation across: Founder Cognitive Blueprint, AI Founder Twin, Narrative Dominance Engine, Strategic Decision Simulator.
- Apply a consistent premium visual theme (neutral palette, strong contrast, restrained accents; no blue/purple as primary accents) across navigation, cards, forms, and outputs.
- Founder Cognitive Blueprint: implement a guided multi-step intake for the listed founder traits, draft saving, Doctrine Manual generation (structured long-form preview), and .txt/.md export.
- AI Founder Twin: add artifact ingestion (text + file uploads stored as text where feasible), artifact library management (add/list/delete), a drafting workspace with preset modes (Board Memo, Investment Evaluation, PR Fallout Simulation), and deterministic non-LLM output that references doctrine traits and extracted artifact patterns; label as prototype simulation.
- Narrative Dominance Engine: implement form-driven workflow (audience + constraints) to generate a playbook with five required sections, support saving multiple playbooks with list view, and .txt/.md export.
- Strategic Decision Simulator: implement scenario setup for specified decision types, transparent scoring model for success probability, key drivers, and 2–5 scenario branches with rationale/mitigations; save runs and compare at least two side-by-side.
- Backend: create a single Motoko actor with CRUD + stable persistence for all module entities (Blueprint drafts/manuals, artifacts, Twin drafts, playbooks, simulator runs) including id/createdAt/updatedAt timestamps.
- Frontend data layer: integrate React Query for all entity load/mutate flows with loading/empty/error states and retry; ensure changes reflect immediately.
- Add an in-app “Load Demo Data” action that seeds one example Blueprint+Manual, a small artifact set, one playbook, and two simulator runs; idempotent and clearly marked as sample.

**User-visible outcome:** Users can navigate the four modules, enter and save data that persists across reloads, generate and export doctrine/playbook documents, run and compare decision simulations, draft founder-style outputs using deterministic rules (no external AI), and instantly explore via demo data.
