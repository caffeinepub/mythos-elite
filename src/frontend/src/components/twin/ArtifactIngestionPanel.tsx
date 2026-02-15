import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, FileText, Loader2 } from 'lucide-react';
import { useArtifacts } from '../../hooks/queries/useArtifacts';
import { QueryState } from '../shared/QueryState';
import { DemoBadge } from '../shared/DemoBadge';
import { toast } from 'sonner';

export function ArtifactIngestionPanel() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { artifacts, isLoading, error, refetch, saveArtifact, deleteArtifact, isSaving } = useArtifacts();

  const handleSave = async () => {
    if (!name.trim() || !content.trim()) {
      toast.error('Please provide both name and content');
      return;
    }

    try {
      const id = `artifact-${Date.now()}`;
      await saveArtifact({ id, name, content });
      toast.success('Artifact saved');
      setName('');
      setContent('');
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to save artifact');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArtifact(id);
      toast.success('Artifact deleted');
    } catch (error) {
      toast.error('Failed to delete artifact');
    }
  };

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Artifact
        </Button>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Artifact</CardTitle>
            <CardDescription>
              Add founder interviews, emails, memos, or public statements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="artifact-name">Artifact Name</Label>
              <Input
                id="artifact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Q3 Board Meeting Transcript"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artifact-content">Content</Label>
              <Textarea
                id="artifact-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste text content here..."
                rows={8}
                className="resize-none font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Artifact
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <QueryState
        isLoading={isLoading}
        error={error}
        isEmpty={artifacts.length === 0}
        emptyMessage="No artifacts yet. Add your first artifact to begin building your founder twin."
        onRetry={refetch}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <Card key={artifact.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4 text-primary" />
                      {artifact.name}
                      {artifact.id.startsWith('artifact') && artifact.id.length < 15 && <DemoBadge />}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {artifact.content.length} characters
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(artifact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {artifact.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
