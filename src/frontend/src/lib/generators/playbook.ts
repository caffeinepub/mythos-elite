export function generatePlaybook(
  title: string,
  audience: string,
  constraints: string
): string {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `NARRATIVE DOMINANCE PLAYBOOK
${title}
Target Audience: ${audience}
Generated: ${date}

═══════════════════════════════════════════════════════════════════

1. PUBLIC IDENTITY POSITIONING

Core Narrative:
Position as a visionary builder who combines technical depth with strategic 
foresight. The narrative centers on solving fundamental problems rather than 
chasing trends.

Key Messaging Pillars:
• Technical credibility through demonstrated expertise
• Long-term thinking over short-term optimization
• Principled decision-making even when unpopular
• Builder identity over pure operator

Audience-Specific Framing (${audience}):
${getAudienceFraming(audience)}

${constraints ? `Strategic Constraints:\n${constraints}\n` : ''}

───────────────────────────────────────────────────────────────────

2. STRATEGIC CONTROVERSY ARCS

Controversy Strategy:
Controlled controversy establishes thought leadership and generates organic 
reach. The key is choosing battles that reinforce core positioning.

Recommended Controversy Themes:
• Challenge industry orthodoxy on [specific technical/strategic topic]
• Take contrarian stance on [emerging trend]
• Publicly question [widely accepted practice]

Controversy Execution Framework:
1. Build credibility foundation first (3-6 months)
2. Choose controversy that aligns with core expertise
3. Present data-driven contrarian view
4. Engage thoughtfully with critics
5. Let supporters amplify organically

Risk Management:
• Avoid political/social controversies outside core domain
• Maintain professional tone even in heated debates
• Have exit strategy if controversy escalates unexpectedly

───────────────────────────────────────────────────────────────────

3. MEDIA ANGLES

Primary Media Hooks:
• "The [Industry] Founder Who [Unique Approach]"
• "Why [Contrarian View] Will Define the Next Decade"
• "Inside [Company]'s Unconventional Strategy"

Tier 1 Target Publications:
• Industry-specific: [Relevant trade publications]
• Business: WSJ, Bloomberg, Forbes
• Tech: TechCrunch, The Information, Stratechery

Story Seeding Strategy:
1. Build relationships with 3-5 key journalists
2. Provide exclusive insights/data periodically
3. Position as go-to expert for [specific domain]
4. Leverage earned media for owned content amplification

Content Calendar:
• Monthly: Deep-dive blog post or essay
• Quarterly: Major announcement or milestone
• Bi-annually: Thought leadership piece in tier 1 publication

───────────────────────────────────────────────────────────────────

4. LONG-TERM CULTURAL NARRATIVE PLACEMENT

10-Year Narrative Arc:
Year 1-2: Establish technical credibility and builder identity
Year 3-5: Become recognized thought leader in [domain]
Year 6-8: Influence industry direction and standards
Year 9-10: Legacy positioning as category-defining founder

Cultural Touchpoints:
• Speaking engagements at tier 1 conferences
• Advisory roles with influential organizations
• Mentorship of next-generation founders
• Contribution to industry standards/frameworks

Legacy Architecture:
The long-term narrative positions you not just as a successful founder, but as 
someone who fundamentally shaped how [industry/domain] evolved. This requires 
consistent reinforcement of core themes over years, not months.

Narrative Consistency Checkpoints:
• Does this action reinforce core positioning?
• Will this matter in 5 years?
• Does this build or dilute the legend?

───────────────────────────────────────────────────────────────────

5. ADVERSARY POSITIONING STRATEGY

Strategic Adversaries:
Identify 2-3 clear competitive or ideological adversaries. This creates narrative 
tension and clarifies your positioning through contrast.

Adversary Selection Criteria:
• Large enough to be credible opponent
• Represents opposing philosophy/approach
• Engagement elevates your positioning
• Conflict is sustainable long-term

Engagement Framework:
• Never attack personally, always attack ideas/approaches
• Use data and logic, not emotion
• Position as principled disagreement, not vendetta
• Let supporters fight the ground war

Competitive Narrative:
"While [Adversary] focuses on [their approach], we believe the future belongs 
to [your approach] because [fundamental reason]."

De-escalation Protocol:
If adversary engagement becomes counterproductive:
1. Acknowledge valid points
2. Reframe as complementary approaches
3. Shift focus to shared industry challenges
4. Maintain high ground

═══════════════════════════════════════════════════════════════════

IMPLEMENTATION TIMELINE

Month 1-3: Foundation
• Establish core messaging
• Build initial content library
• Identify key media relationships

Month 4-6: Amplification
• Launch first controversy arc
• Secure tier 2 media placements
• Build social proof

Month 7-12: Dominance
• Tier 1 media placements
• Speaking engagements
• Industry influence activities

═══════════════════════════════════════════════════════════════════

MEASUREMENT FRAMEWORK

Leading Indicators:
• Media mentions and sentiment
• Social media engagement and follower growth
• Speaking invitation quality
• Inbound partnership/investment interest

Lagging Indicators:
• Brand recognition surveys
• Industry influence (standards, advisory roles)
• Talent attraction quality
• Valuation multiple vs. peers

═══════════════════════════════════════════════════════════════════

END OF PLAYBOOK`;
}

function getAudienceFraming(audience: string): string {
  const framings: Record<string, string> = {
    'Investors': 'Emphasize strategic vision, market opportunity, and execution capability. Frame decisions through lens of long-term value creation.',
    'Media': 'Lead with narrative hooks and contrarian insights. Make complex topics accessible without dumbing down.',
    'Industry Peers': 'Demonstrate technical depth and strategic sophistication. Engage as peer, not superior.',
    'General Public': 'Focus on mission and impact. Translate technical complexity into human benefit.',
    'Employees': 'Inspire with vision while maintaining transparency about challenges. Position as builder-in-chief.',
    'Competitors': 'Project confidence and inevitability. Acknowledge their strengths while highlighting fundamental advantages.',
  };
  
  return framings[audience] || 'Tailor messaging to audience values and information needs.';
}
