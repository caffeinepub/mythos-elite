import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Megaphone } from 'lucide-react';
import { usePlaybooks } from '../../hooks/queries/usePlaybooks';
import { DemoBadge } from '../shared/DemoBadge';
import { toast } from 'sonner';
import type { Playbook } from '../../backend';

interface PlaybookListProps {
  playbooks: Playbook[];
}

export function PlaybookList({ playbooks }: PlaybookListProps) {
  const { deletePlaybook } = usePlaybooks();

  const handleDelete = async (id: string) => {
    try {
      await deletePlaybook(id);
      toast.success('Playbook deleted');
    } catch (error) {
      toast.error('Failed to delete playbook');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {playbooks.map((playbook) => (
        <Card key={playbook.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  {playbook.title}
                  {playbook.id.startsWith('playbook1') && <DemoBadge />}
                </CardTitle>
                <CardDescription className="mt-1">
                  Target: {playbook.audience}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(playbook.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {playbook.content}
            </p>
            {playbook.constraints && (
              <p className="text-xs text-muted-foreground mt-2">
                Constraints: {playbook.constraints}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
