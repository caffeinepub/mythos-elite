import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GitBranch } from 'lucide-react';
import { ScenarioForm } from '../components/simulator/ScenarioForm';
import { ScenarioList } from '../components/simulator/ScenarioList';
import { ScenarioCompare } from '../components/simulator/ScenarioCompare';
import { useScenarios } from '../hooks/queries/useScenarios';
import { QueryState } from '../components/shared/QueryState';

export function SimulatorPage() {
  const [showForm, setShowForm] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const { scenarios, isLoading, error, refetch } = useScenarios();

  if (showForm) {
    return <ScenarioForm onClose={() => setShowForm(false)} />;
  }

  if (compareMode) {
    return <ScenarioCompare scenarios={scenarios} onClose={() => setCompareMode(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategic Decision Simulator™</h1>
          <p className="text-muted-foreground mt-2">
            Probabilistic scenario modeling for high-stakes founder decisions
          </p>
        </div>
        <div className="flex gap-2">
          {scenarios.length >= 2 && (
            <Button onClick={() => setCompareMode(true)} variant="outline" className="gap-2">
              Compare Scenarios
            </Button>
          )}
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Simulation
          </Button>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            What This Module Does
          </CardTitle>
          <CardDescription>
            Before making a major move—launching a product, acquiring a competitor, firing an executive, or entering 
            a new political space—run probabilistic scenario modeling based on market data, behavioral forecasting, 
            and historical reaction patterns. This prototype uses transparent deterministic logic to demonstrate the concept.
          </CardDescription>
        </CardHeader>
      </Card>

      <QueryState
        isLoading={isLoading}
        error={error}
        isEmpty={scenarios.length === 0}
        emptyMessage="No simulations yet. Run your first strategic decision simulation to begin."
        onRetry={refetch}
      >
        <ScenarioList scenarios={scenarios} />
      </QueryState>
    </div>
  );
}
