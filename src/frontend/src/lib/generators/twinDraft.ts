import type { Artifact, Trait } from '../../backend';

type DraftMode = 'board-memo' | 'investment-eval' | 'pr-fallout';

export function generateTwinDraft(
  prompt: string,
  mode: DraftMode,
  artifacts: Artifact[],
  traits: Trait[]
): string {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Extract patterns from artifacts
  const toneKeywords = extractToneKeywords(artifacts);
  const principles = extractPrinciples(artifacts);

  let response = '';

  switch (mode) {
    case 'board-memo':
      response = generateBoardMemo(prompt, date, toneKeywords, principles, traits);
      break;
    case 'investment-eval':
      response = generateInvestmentEval(prompt, date, toneKeywords, principles, traits);
      break;
    case 'pr-fallout':
      response = generatePRFallout(prompt, date, toneKeywords, principles, traits);
      break;
  }

  return response;
}

function extractToneKeywords(artifacts: Artifact[]): string[] {
  const keywords = ['strategic', 'decisive', 'transparent', 'data-driven', 'bold'];
  if (artifacts.some(a => a.content.toLowerCase().includes('innovation'))) {
    keywords.push('innovative');
  }
  if (artifacts.some(a => a.content.toLowerCase().includes('risk'))) {
    keywords.push('calculated');
  }
  return keywords;
}

function extractPrinciples(artifacts: Artifact[]): string[] {
  const principles = [
    'Maintain strategic clarity',
    'Prioritize long-term value creation',
    'Communicate with transparency',
  ];
  
  if (artifacts.some(a => a.content.toLowerCase().includes('market'))) {
    principles.push('Leverage market dynamics');
  }
  
  return principles;
}

function generateBoardMemo(
  prompt: string,
  date: string,
  tone: string[],
  principles: string[],
  traits: Trait[]
): string {
  const riskTrait = traits.find(t => t.name.toLowerCase().includes('risk'));
  
  return `BOARD MEMORANDUM
Date: ${date}
Re: ${prompt}

EXECUTIVE SUMMARY

This memo addresses the strategic considerations outlined in the prompt. Based on 
our established decision-making framework (${tone.slice(0, 2).join(', ')} approach), 
I recommend the following course of action.

STRATEGIC CONTEXT

${principles[0]}. Our current market position requires us to balance immediate 
tactical wins with long-term strategic positioning. The decision framework here 
draws from our core heuristics around ${riskTrait ? riskTrait.name.toLowerCase() : 'calculated risk-taking'}.

RECOMMENDATION

1. Immediate Actions
   - Assess current resource allocation
   - Validate assumptions with market data
   - Establish clear success metrics

2. Medium-term Strategy
   - ${principles[1]}
   - Maintain operational flexibility
   - Monitor competitive response

3. Risk Mitigation
   ${riskTrait ? `- ${riskTrait.description.slice(0, 100)}...` : '- Implement staged rollout approach'}
   - Establish clear decision gates
   - Maintain strategic optionality

CONCLUSION

This approach aligns with our established doctrine while maintaining the flexibility 
to adapt as conditions evolve. I recommend board approval to proceed with Phase 1.

[Founder Signature]`;
}

function generateInvestmentEval(
  prompt: string,
  date: string,
  tone: string[],
  principles: string[],
  traits: Trait[]
): string {
  return `INVESTMENT EVALUATION
Date: ${date}
Opportunity: ${prompt}

OVERVIEW

This evaluation applies our investment framework (${tone.slice(0, 3).join(', ')}) 
to assess strategic fit and expected value creation.

STRATEGIC FIT ANALYSIS

Market Position: The opportunity aligns with our thesis around ${principles[0].toLowerCase()}.

Synergy Assessment:
• Operational: Medium-High potential for integration
• Strategic: Strong alignment with long-term vision
• Cultural: Requires validation through due diligence

FINANCIAL MODELING

Base Case: Assumes moderate market growth and standard integration timeline
Bull Case: Accelerated synergy capture and market expansion
Bear Case: Extended integration period with competitive pressure

RISK ASSESSMENT

Key Risks:
1. Integration complexity
2. Market timing
3. Competitive response
4. Regulatory considerations

Mitigation Strategies:
• Staged acquisition approach
• Clear integration roadmap
• Dedicated integration team
• Regular milestone reviews

RECOMMENDATION

PROCEED with due diligence phase. The strategic rationale is compelling, but 
execution risk requires careful validation of operational assumptions.

Next Steps:
1. 60-day due diligence period
2. Integration planning workstream
3. Board approval for final terms`;
}

function generatePRFallout(
  prompt: string,
  date: string,
  tone: string[],
  principles: string[],
  traits: Trait[]
): string {
  const crisisTrait = traits.find(t => t.name.toLowerCase().includes('crisis'));
  
  return `PR FALLOUT SIMULATION
Date: ${date}
Scenario: ${prompt}

IMMEDIATE RESPONSE (0-24 hours)

Public Statement:
"We acknowledge the situation and are conducting a thorough review. ${principles[2]} 
is core to our values. We will share findings as soon as our assessment is complete."

Internal Communication:
• Brief leadership team immediately
• Prepare employee FAQ
• Activate crisis response protocol

STAKEHOLDER MANAGEMENT (24-72 hours)

Investors: Direct outreach to key stakeholders with factual briefing
Media: Controlled engagement through designated spokesperson
Employees: Town hall to address concerns and maintain morale
Customers: Proactive communication about any service impact

STRATEGIC POSITIONING (Week 1-2)

Narrative Framework:
1. Acknowledge the issue directly
2. Demonstrate accountability
3. Outline corrective actions
4. Reinforce long-term vision

${crisisTrait ? `Crisis Response Pattern:\n${crisisTrait.description.slice(0, 150)}...` : 'Maintain calm, decisive leadership throughout the response cycle.'}

LONG-TERM RECOVERY (Month 1+)

• Implement systemic improvements
• Rebuild stakeholder confidence through consistent execution
• Use as case study for organizational learning
• Monitor sentiment and adjust messaging as needed

PROBABILITY ASSESSMENT

Best Case: Issue contained within 48 hours, minimal lasting impact
Base Case: 2-week news cycle, moderate reputation impact, full recovery in 3-6 months
Worst Case: Extended controversy, regulatory scrutiny, 12+ month recovery period

RECOMMENDATION

Activate crisis protocol immediately. The ${tone[0]} approach requires us to 
get ahead of the narrative while maintaining ${tone[1]} communication with all stakeholders.`;
}
