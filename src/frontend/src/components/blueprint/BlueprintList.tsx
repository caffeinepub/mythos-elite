import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, FileText } from 'lucide-react';
import { useBlueprints } from '../../hooks/queries/useBlueprints';
import { DemoBadge } from '../shared/DemoBadge';
import { toast } from 'sonner';
import type { Blueprint } from '../../backend';

interface BlueprintListProps {
  blueprints: Blueprint[];
}

export function BlueprintList({ blueprints }: BlueprintListProps) {
  const { deleteBlueprint } = useBlueprints();

  const handleDelete = async (id: string) => {
    try {
      await deleteBlueprint(id);
      toast.success('Blueprint deleted');
    } catch (error) {
      toast.error('Failed to delete blueprint');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blueprints.map((blueprint) => (
        <Card key={blueprint.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {blueprint.name}
                  {blueprint.id.startsWith('blueprint1') && <DemoBadge />}
                </CardTitle>
                <CardDescription className="mt-1">
                  {blueprint.traits.length} traits captured
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(blueprint.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {blueprint.traits.slice(0, 3).map((trait, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium">{trait.name}:</span>{' '}
                  <span className="text-muted-foreground">
                    {trait.description.slice(0, 60)}...
                  </span>
                </div>
              ))}
              {blueprint.traits.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  +{blueprint.traits.length - 3} more traits
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
