import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Sparkles, Loader2, Download } from 'lucide-react';
import { usePlaybooks } from '../../hooks/queries/usePlaybooks';
import { generatePlaybook } from '../../lib/generators/playbook';
import { exportAsText, exportAsMarkdown } from '../../lib/exportText';
import { toast } from 'sonner';

interface PlaybookFormProps {
  onClose: () => void;
}

const audiences = [
  'Investors',
  'Media',
  'Industry Peers',
  'General Public',
  'Employees',
  'Competitors',
];

export function PlaybookForm({ onClose }: PlaybookFormProps) {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [constraints, setConstraints] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { savePlaybook, isSaving } = usePlaybooks();

  const handleGenerate = async () => {
    if (!title.trim() || !audience) {
      toast.error('Please provide title and audience');
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const content = generatePlaybook(title, audience, constraints);
      setGeneratedContent(content);
    } catch (error) {
      toast.error('Failed to generate playbook');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    try {
      const id = `playbook-${Date.now()}`;
      await savePlaybook({ id, title, audience, constraints, content: generatedContent });
      toast.success('Playbook saved');
      onClose();
    } catch (error) {
      toast.error('Failed to save playbook');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {generatedContent && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAsText(generatedContent, `${title}-playbook.txt`)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export .txt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAsMarkdown(generatedContent, `${title}-playbook.md`)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export .md
            </Button>
            <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Playbook
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Narrative Playbook Configuration</CardTitle>
          <CardDescription>
            Define your target audience and strategic constraints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Playbook Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q4 Market Positioning Strategy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((aud) => (
                  <SelectItem key={aud} value={aud}>
                    {aud}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Strategic Constraints (Optional)</Label>
            <Textarea
              id="constraints"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g., Maintain technical credibility, avoid political controversy..."
              rows={3}
              className="resize-none"
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2">
            {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
            <Sparkles className="h-4 w-4" />
            Generate Playbook
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Narrative Playbook</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
