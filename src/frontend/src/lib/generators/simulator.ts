import type { Assumption, Branch } from '../../backend';

export function runSimulation(
  decisionType: string,
  assumptions: Assumption[]
): { probability: number; drivers: string[]; branches: Branch[] } {
  // Deterministic scoring based on assumptions
  let baseScore = 50;
  const drivers: string[] = [];
  
  // Analyze assumptions
  assumptions.forEach(assumption => {
    const value = assumption.value.toLowerCase();
    const name = assumption.name.toLowerCase();
    
    // Positive indicators
    if (value.includes('high') || value.includes('strong') || value.includes('favorable')) {
      baseScore += 8;
      drivers.push(`Strong ${assumption.name} provides positive momentum`);
    } else if (value.includes('medium') || value.includes('moderate')) {
      baseScore += 3;
    } else if (value.includes('low') || value.includes('weak') || value.includes('unfavorable')) {
      baseScore -= 5;
      drivers.push(`Weak ${assumption.name} presents headwinds`);
    }
    
    // Market-specific factors
    if (name.includes('market') || name.includes('demand')) {
      baseScore += 5;
      drivers.push('Market dynamics are a key success factor');
    }
    
    // Risk factors
    if (name.includes('risk') || name.includes('competition')) {
      if (value.includes('low')) {
        baseScore += 7;
      } else if (value.includes('high')) {
        baseScore -= 8;
      }
    }
  });
  
  // Cap probability between 15 and 85
  const probability = Math.max(15, Math.min(85, baseScore));
  
  // Generate branches based on decision type and probability
  const branches = generateBranches(decisionType, probability, assumptions);
  
  // Select top drivers
  const topDrivers = drivers.slice(0, 3);
  if (topDrivers.length < 3) {
    topDrivers.push('Execution capability and team strength');
    topDrivers.push('Market timing and competitive positioning');
    topDrivers.push('Resource allocation and operational efficiency');
  }
  
  return {
    probability,
    drivers: topDrivers.slice(0, 3),
    branches,
  };
}

function generateBranches(
  decisionType: string,
  probability: number,
  assumptions: Assumption[]
): Branch[] {
  const branches: Branch[] = [];
  
  if (probability >= 60) {
    branches.push({
      name: 'Accelerated Success Path',
      rationale: `With ${probability}% success probability, immediate execution is recommended. Key assumptions validate market readiness and competitive positioning. Mitigation: Establish clear milestones and decision gates to maintain momentum while managing risk.`,
    });
    
    branches.push({
      name: 'Measured Rollout',
      rationale: 'Alternative approach with staged implementation to validate assumptions incrementally. Mitigation: Pilot program with select segment before full launch, allowing for course correction.',
    });
  } else if (probability >= 40) {
    branches.push({
      name: 'Conditional Proceed',
      rationale: `Moderate success probability (${probability}%) suggests proceeding with enhanced risk management. Mitigation: Strengthen weak assumptions through additional validation, establish clear exit criteria.`,
    });
    
    branches.push({
      name: 'Strategic Delay',
      rationale: 'Defer decision until key assumptions can be strengthened. Mitigation: Use delay period to improve market position, build capabilities, or wait for more favorable conditions.',
    });
    
    branches.push({
      name: 'Pivot Approach',
      rationale: 'Modify core strategy to address identified weaknesses. Mitigation: Redesign approach to leverage strengths while minimizing exposure to weak assumptions.',
    });
  } else {
    branches.push({
      name: 'Strategic Pause',
      rationale: `Low success probability (${probability}%) indicates significant headwinds. Mitigation: Conduct deeper analysis of weak assumptions, consider whether fundamental strategy needs revision.`,
    });
    
    branches.push({
      name: 'Alternative Approach',
      rationale: 'Current path shows high risk. Explore alternative strategies that address the same objective with different risk profile. Mitigation: Brainstorm 3-5 alternative approaches and run comparative analysis.',
    });
    
    branches.push({
      name: 'No-Go Decision',
      rationale: 'Recommend against proceeding under current conditions. Mitigation: Document decision rationale, establish triggers for future reconsideration if conditions improve.',
    });
  }
  
  return branches.slice(0, 3);
}
