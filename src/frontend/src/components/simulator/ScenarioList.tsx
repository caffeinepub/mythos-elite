import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, GitBranch } from 'lucide-react';
import { useScenarios } from '../../hooks/queries/useScenarios';
import { DemoBadge } from '../shared/DemoBadge';
import { toast } from 'sonner';
import type { Scenario } from '../../backend';

interface ScenarioListProps {
  scenarios: Scenario[];
}

export function ScenarioList({ scenarios }: ScenarioListProps) {
  const { deleteScenario } = useScenarios();

  const handleDelete = async (id: string) => {
    try {
      await deleteScenario(id);
      toast.success('Scenario deleted');
    } catch (error) {
      toast.error('Failed to delete scenario');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scenarios.map((scenario) => (
        <Card key={scenario.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  {scenario.name}
                  {scenario.id.startsWith('scenario') && scenario.id.length < 15 && <DemoBadge />}
                </CardTitle>
                <CardDescription className="mt-1">
                  {scenario.assumptions.length} assumptions • {scenario.branches.length} branches
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(scenario.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm font-medium mb-2">Outcome</div>
              <p className="text-sm text-muted-foreground">{scenario.outcomeSummary}</p>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Key Assumptions</div>
              <div className="flex flex-wrap gap-2">
                {scenario.assumptions.slice(0, 3).map((assumption, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {assumption.name}: {assumption.value}
                  </Badge>
                ))}
                {scenario.assumptions.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{scenario.assumptions.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
