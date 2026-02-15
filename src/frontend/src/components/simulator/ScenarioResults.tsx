import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import type { Branch } from '../../backend';

interface ScenarioResultsProps {
  probability: number;
  drivers: string[];
  branches: Branch[];
}

export function ScenarioResults({ probability, drivers, branches }: ScenarioResultsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Success Probability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">{probability}%</div>
            <Progress value={probability} className="flex-1 h-3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Drivers</CardTitle>
          <CardDescription>
            Top contributing factors to the outcome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {drivers.map((driver, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-medium">{index + 1}.</span>
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Scenario Branches
          </CardTitle>
          <CardDescription>
            Possible outcomes with rationale and mitigations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {branches.map((branch, index) => (
            <div key={index} className="border-l-2 border-primary/30 pl-4 space-y-1">
              <div className="font-medium">{branch.name}</div>
              <div className="text-sm text-muted-foreground">{branch.rationale}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
