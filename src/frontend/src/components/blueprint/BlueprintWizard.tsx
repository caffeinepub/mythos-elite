import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';
import { useBlueprints } from '../../hooks/queries/useBlueprints';
import { generateDoctrineManual } from '../../lib/generators/doctrineManual';
import { DoctrineManualPreview } from './DoctrineManualPreview';
import { toast } from 'sonner';
import type { Trait } from '../../backend';

interface BlueprintWizardProps {
  onClose: () => void;
}

const traitCategories = [
  { name: 'Strategic Heuristics', description: 'Core decision-making principles and strategic frameworks' },
  { name: 'Risk Tolerance Model', description: 'Appetite for uncertainty and loss thresholds' },
  { name: 'Moral Decision Thresholds', description: 'Ethical boundaries and value-based constraints' },
  { name: 'Crisis Response Patterns', description: 'Behavioral patterns under extreme pressure' },
  { name: 'Shadow Traits', description: 'Unconscious drivers and hidden motivations' },
  { name: 'Long-term Worldview', description: 'Vision for the future and legacy aspirations' },
  { name: 'Competitive Instinct Structure', description: 'Approach to competition and market positioning' },
  { name: 'Communication Cadence', description: 'Preferred communication style and frequency' },
];

export function BlueprintWizard({ onClose }: BlueprintWizardProps) {
  const [step, setStep] = useState(0);
  const [blueprintName, setBlueprintName] = useState('');
  const [traits, setTraits] = useState<Trait[]>(
    traitCategories.map(cat => ({ name: cat.name, description: '' }))
  );
  const [generatedManual, setGeneratedManual] = useState<string | null>(null);
  const { saveBlueprint, isSaving } = useBlueprints();

  const currentTrait = traits[step];
  const progress = ((step + 1) / traitCategories.length) * 100;

  const handleNext = () => {
    if (step < traitCategories.length - 1) {
      setStep(step + 1);
    } else {
      // Generate manual
      const manual = generateDoctrineManual(blueprintName || 'Untitled Blueprint', traits);
      setGeneratedManual(manual);
    }
  };

  const handleBack = () => {
    if (generatedManual) {
      setGeneratedManual(null);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSave = async () => {
    try {
      const id = `blueprint-${Date.now()}`;
      await saveBlueprint({
        id,
        name: blueprintName || 'Untitled Blueprint',
        traits: traits.filter(t => t.description.trim()),
      });
      toast.success('Blueprint saved successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save blueprint');
    }
  };

  const updateTrait = (description: string) => {
    const newTraits = [...traits];
    newTraits[step] = { ...newTraits[step], description };
    setTraits(newTraits);
  };

  if (generatedManual) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Form
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4" />
            Save Blueprint
          </Button>
        </div>
        <DoctrineManualPreview manual={generatedManual} blueprintName={blueprintName} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {step + 1} of {traitCategories.length}
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 0 ? 'Blueprint Name' : traitCategories[step].name}
          </CardTitle>
          <CardDescription>
            {step === 0 
              ? 'Give this cognitive blueprint a name to identify it later'
              : traitCategories[step].description
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 ? (
            <div className="space-y-2">
              <Label htmlFor="name">Blueprint Name</Label>
              <Input
                id="name"
                value={blueprintName}
                onChange={(e) => setBlueprintName(e.target.value)}
                placeholder="e.g., Q4 2026 Strategic Blueprint"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="description">
                Describe your {currentTrait.name.toLowerCase()}
              </Label>
              <Textarea
                id="description"
                value={currentTrait.description}
                onChange={(e) => updateTrait(e.target.value)}
                placeholder="Enter detailed description..."
                rows={8}
                className="resize-none"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} className="gap-2">
          {step === traitCategories.length - 1 ? 'Generate Manual' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
