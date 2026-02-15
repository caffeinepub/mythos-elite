import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare } from 'lucide-react';
import { ArtifactIngestionPanel } from '../components/twin/ArtifactIngestionPanel';
import { TwinDraftWorkspace } from '../components/twin/TwinDraftWorkspace';

export function TwinPage() {
  const [activeTab, setActiveTab] = useState('artifacts');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Founder Twin™</h1>
        <p className="text-muted-foreground mt-2">
          Calibrated cognitive simulation trained on your strategic artifacts and decision patterns
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            What This Module Does
          </CardTitle>
          <CardDescription>
            The AI Founder Twin is a calibrated cognitive simulation—not a chatbot. It ingests your interviews, 
            emails, strategic memos, and public statements to generate founder-style responses for board memos, 
            investment evaluations, PR scenarios, and strategic decisions. This is a prototype using deterministic 
            logic to demonstrate the concept.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="artifacts">Artifact Library</TabsTrigger>
          <TabsTrigger value="draft">Draft Workspace</TabsTrigger>
        </TabsList>

        <TabsContent value="artifacts" className="space-y-4">
          <ArtifactIngestionPanel />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <TwinDraftWorkspace />
        </TabsContent>
      </Tabs>
    </div>
  );
}
