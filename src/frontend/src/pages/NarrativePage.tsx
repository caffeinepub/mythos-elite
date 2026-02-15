import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Megaphone } from 'lucide-react';
import { PlaybookForm } from '../components/narrative/PlaybookForm';
import { PlaybookList } from '../components/narrative/PlaybookList';
import { usePlaybooks } from '../hooks/queries/usePlaybooks';
import { QueryState } from '../components/shared/QueryState';

export function NarrativePage() {
  const [showForm, setShowForm] = useState(false);
  const { playbooks, isLoading, error, refetch } = usePlaybooks();

  if (showForm) {
    return <PlaybookForm onClose={() => setShowForm(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Narrative Dominance Engine™</h1>
          <p className="text-muted-foreground mt-2">
            Strategic mythology engineering for public identity and cultural narrative placement
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Playbook
        </Button>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            What This Module Does
          </CardTitle>
          <CardDescription>
            Elite founders don't just build companies—they build mythology. This engine architects your public 
            identity positioning, strategic controversy arcs, media angles, long-term cultural narrative placement, 
            and adversary positioning strategy. This isn't PR. It's legend architecture.
          </CardDescription>
        </CardHeader>
      </Card>

      <QueryState
        isLoading={isLoading}
        error={error}
        isEmpty={playbooks.length === 0}
        emptyMessage="No playbooks yet. Create your first narrative playbook to begin architecting your legend."
        onRetry={refetch}
      >
        <PlaybookList playbooks={playbooks} />
      </QueryState>
    </div>
  );
}
