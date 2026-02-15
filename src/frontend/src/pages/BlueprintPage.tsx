import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { BlueprintWizard } from '../components/blueprint/BlueprintWizard';
import { BlueprintList } from '../components/blueprint/BlueprintList';
import { useBlueprints } from '../hooks/queries/useBlueprints';
import { QueryState } from '../components/shared/QueryState';

export function BlueprintPage() {
  const [showWizard, setShowWizard] = useState(false);
  const { blueprints, isLoading, error, refetch } = useBlueprints();

  if (showWizard) {
    return <BlueprintWizard onClose={() => setShowWizard(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Founder Cognitive Blueprint™</h1>
          <p className="text-muted-foreground mt-2">
            Deep extraction of strategic heuristics, decision patterns, and worldview architecture
          </p>
        </div>
        <Button onClick={() => setShowWizard(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Blueprint
        </Button>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            What This Module Does
          </CardTitle>
          <CardDescription>
            The Cognitive Blueprint extracts and codifies your strategic thinking patterns, risk models, 
            moral frameworks, and crisis response heuristics into a comprehensive Founder Doctrine Manual—a 
            100–300 page internal document that becomes the backbone of your company's decision-making architecture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img 
            src="/assets/generated/mythos-elite-hero.dim_1600x900.png" 
            alt="Cognitive Blueprint" 
            className="w-full rounded-lg opacity-80"
          />
        </CardContent>
      </Card>

      <QueryState
        isLoading={isLoading}
        error={error}
        isEmpty={blueprints.length === 0}
        emptyMessage="No blueprints yet. Create your first Founder Cognitive Blueprint to begin."
        onRetry={refetch}
      >
        <BlueprintList blueprints={blueprints} />
      </QueryState>
    </div>
  );
}
