import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, Info } from 'lucide-react';
import { useTwinDrafts } from '../../hooks/queries/useTwinDrafts';
import { useArtifacts } from '../../hooks/queries/useArtifacts';
import { useBlueprints } from '../../hooks/queries/useBlueprints';
import { generateTwinDraft } from '../../lib/generators/twinDraft';
import { toast } from 'sonner';

type DraftMode = 'board-memo' | 'investment-eval' | 'pr-fallout';

const draftModes = [
  { value: 'board-memo', label: 'Board Memo' },
  { value: 'investment-eval', label: 'Investment Evaluation' },
  { value: 'pr-fallout', label: 'PR Fallout Simulation' },
];

export function TwinDraftWorkspace() {
  const [mode, setMode] = useState<DraftMode>('board-memo');
  const [prompt, setPrompt] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { saveTwinDraft, isSaving } = useTwinDrafts();
  const { artifacts } = useArtifacts();
  const { blueprints } = useBlueprints();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const blueprint = blueprints.find(b => b.id === selectedBlueprint);
      const response = generateTwinDraft(prompt, mode, artifacts, blueprint?.traits || []);
      setGeneratedResponse(response);
    } catch (error) {
      toast.error('Failed to generate response');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedResponse) return;

    try {
      const id = `twin-draft-${Date.now()}`;
      await saveTwinDraft({ id, prompt, response: generatedResponse });
      toast.success('Draft saved');
      setPrompt('');
      setGeneratedResponse('');
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a prototype simulation using deterministic logic. It references your blueprints and artifacts 
          to generate founder-style responses without external AI models.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Draft Configuration</CardTitle>
          <CardDescription>
            Select a drafting mode and optionally reference a cognitive blueprint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mode">Drafting Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as DraftMode)}>
                <SelectTrigger id="mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {draftModes.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blueprint">Reference Blueprint (Optional)</Label>
              <Select value={selectedBlueprint} onValueChange={setSelectedBlueprint}>
                <SelectTrigger id="blueprint">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {blueprints.map((bp) => (
                    <SelectItem key={bp.id} value={bp.id}>
                      {bp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Draft a board memo explaining our Q4 strategic pivot..."
              rows={4}
              className="resize-none"
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2">
            {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
            <Sparkles className="h-4 w-4" />
            Generate Response
          </Button>
        </CardContent>
      </Card>

      {generatedResponse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Response</CardTitle>
              <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Draft
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {generatedResponse}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
