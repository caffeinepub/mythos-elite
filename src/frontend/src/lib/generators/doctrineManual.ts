import type { Trait } from '../../backend';

export function generateDoctrineManual(blueprintName: string, traits: Trait[]): string {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  let manual = `FOUNDER DOCTRINE MANUAL
${blueprintName}
Generated: ${date}

═══════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

This Founder Doctrine Manual codifies the cognitive architecture, strategic 
heuristics, and decision-making frameworks that define ${blueprintName}. 
It serves as the authoritative reference for maintaining consistency in 
high-stakes decisions, crisis response, and long-term strategic positioning.

═══════════════════════════════════════════════════════════════════

`;

  traits.forEach((trait, index) => {
    if (!trait.description.trim()) return;

    manual += `${index + 1}. ${trait.name.toUpperCase()}\n\n`;
    manual += `${trait.description}\n\n`;
    manual += `───────────────────────────────────────────────────────────────────\n\n`;
  });

  manual += `═══════════════════════════════════════════════════════════════════

IMPLEMENTATION NOTES

This doctrine manual should be:
• Referenced before major strategic decisions
• Updated quarterly to reflect evolved thinking
• Shared selectively with key leadership
• Used to train AI systems and decision support tools
• Protected as confidential strategic IP

═══════════════════════════════════════════════════════════════════

END OF DOCTRINE MANUAL`;

  return manual;
}
