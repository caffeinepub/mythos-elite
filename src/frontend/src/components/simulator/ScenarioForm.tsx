import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { useScenarios } from '../../hooks/queries/useScenarios';
import { runSimulation } from '../../lib/generators/simulator';
import { ScenarioResults } from './ScenarioResults';
import { toast } from 'sonner';
import type { Assumption, Branch } from '../../backend';

interface ScenarioFormProps {
  onClose: () => void;
}

const decisionTypes = [
  'Launch New Product',
  'Acquire Competitor',
  'Fire Executive',
  'Enter New Political Space',
];

export function ScenarioForm({ onClose }: ScenarioFormProps) {
  const [name, setName] = useState('');
  const [decisionType, setDecisionType] = useState('');
  const [assumptions, setAssumptions] = useState<Assumption[]>([
    { name: '', value: '' },
  ]);
  const [results, setResults] = useState<{ probability: number; drivers: string[]; branches: Branch[] } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const { saveScenario, isSaving } = useScenarios();

  const addAssumption = () => {
    setAssumptions([...assumptions, { name: '', value: '' }]);
  };

  const removeAssumption = (index: number) => {
    setAssumptions(assumptions.filter((_, i) => i !== index));
  };

  const updateAssumption = (index: number, field: 'name' | 'value', value: string) => {
    const newAssumptions = [...assumptions];
    newAssumptions[index] = { ...newAssumptions[index], [field]: value };
    setAssumptions(newAssumptions);
  };

  const handleSimulate = async () => {
    if (!name.trim() || !decisionType) {
      toast.error('Please provide scenario name and decision type');
      return;
    }

    const validAssumptions = assumptions.filter(a => a.name.trim() && a.value.trim());
    if (validAssumptions.length === 0) {
      toast.error('Please add at least one assumption');
      return;
    }

    setIsSimulating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const simulationResults = runSimulation(decisionType, validAssumptions);
      setResults(simulationResults);
    } catch (error) {
      toast.error('Failed to run simulation');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSave = async () => {
    if (!results) return;

    try {
      const id = `scenario-${Date.now()}`;
      const validAssumptions = assumptions.filter(a => a.name.trim() && a.value.trim());
      await saveScenario({
        id,
        name,
        assumptions: validAssumptions,
        outcomeSummary: `${results.probability}% probability of success`,
        branches: results.branches,
      });
      toast.success('Scenario saved');
      onClose();
    } catch (error) {
      toast.error('Failed to save scenario');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {results && (
          <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Scenario
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Configuration</CardTitle>
          <CardDescription>
            Define your decision and key assumptions for probabilistic modeling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Scenario Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Q1 Product Launch Decision"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">Decision Type</Label>
            <Select value={decisionType} onValueChange={setDecisionType}>
              <SelectTrigger id="decision">
                <SelectValue placeholder="Select decision type" />
              </SelectTrigger>
              <SelectContent>
                {decisionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Assumptions</Label>
              <Button variant="outline" size="sm" onClick={addAssumption} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
            {assumptions.map((assumption, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={assumption.name}
                  onChange={(e) => updateAssumption(index, 'name', e.target.value)}
                  placeholder="Factor name (e.g., Market Demand)"
                  className="flex-1"
                />
                <Input
                  value={assumption.value}
                  onChange={(e) => updateAssumption(index, 'value', e.target.value)}
                  placeholder="Value (e.g., High)"
                  className="flex-1"
                />
                {assumptions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAssumption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button onClick={handleSimulate} disabled={isSimulating} className="gap-2">
            {isSimulating && <Loader2 className="h-4 w-4 animate-spin" />}
            <Sparkles className="h-4 w-4" />
            Run Simulation
          </Button>
        </CardContent>
      </Card>

      {results && (
        <ScenarioResults
          probability={results.probability}
          drivers={results.drivers}
          branches={results.branches}
        />
      )}
    </div>
  );
}
