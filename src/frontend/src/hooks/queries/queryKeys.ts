export const queryKeys = {
  blueprints: ['blueprints'] as const,
  blueprint: (id: string) => ['blueprints', id] as const,
  artifacts: ['artifacts'] as const,
  artifact: (id: string) => ['artifacts', id] as const,
  twinDrafts: ['twinDrafts'] as const,
  twinDraft: (id: string) => ['twinDrafts', id] as const,
  playbooks: ['playbooks'] as const,
  playbook: (id: string) => ['playbooks', id] as const,
  scenarios: ['scenarios'] as const,
  scenario: (id: string) => ['scenarios', id] as const,
};
