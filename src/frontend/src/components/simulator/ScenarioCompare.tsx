import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, GitCompare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Scenario } from '../../backend';

interface ScenarioCompareProps {
  scenarios: Scenario[];
  onClose: () => void;
}

export function ScenarioCompare({ scenarios, onClose }: ScenarioCompareProps) {
  const [scenario1Id, setScenario1Id] = useState('');
  const [scenario2Id, setScenario2Id] = useState('');

  const scenario1 = scenarios.find(s => s.id === scenario1Id);
  const scenario2 = scenarios.find(s => s.id === scenario2Id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GitCompare className="h-5 w-5" />
          Compare Scenarios
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Scenarios to Compare</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="scenario1">Scenario 1</Label>
            <Select value={scenario1Id} onValueChange={setScenario1Id}>
              <SelectTrigger id="scenario1">
                <SelectValue placeholder="Select first scenario" />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((s) => (
                  <SelectItem key={s.id} value={s.id} disabled={s.id === scenario2Id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scenario2">Scenario 2</Label>
            <Select value={scenario2Id} onValueChange={setScenario2Id}>
              <SelectTrigger id="scenario2">
                <SelectValue placeholder="Select second scenario" />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((s) => (
                  <SelectItem key={s.id} value={s.id} disabled={s.id === scenario1Id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {scenario1 && scenario2 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{scenario1.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Outcome</div>
                <p className="text-sm text-muted-foreground">{scenario1.outcomeSummary}</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Assumptions</div>
                <div className="space-y-1">
                  {scenario1.assumptions.map((a, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{a.name}:</span> {a.value}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Branches</div>
                <div className="space-y-2">
                  {scenario1.branches.map((b, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-3">
                      <div className="text-sm font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.rationale}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{scenario2.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Outcome</div>
                <p className="text-sm text-muted-foreground">{scenario2.outcomeSummary}</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Assumptions</div>
                <div className="space-y-1">
                  {scenario2.assumptions.map((a, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{a.name}:</span> {a.value}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Branches</div>
                <div className="space-y-2">
                  {scenario2.branches.map((b, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-3">
                      <div className="text-sm font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.rationale}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
