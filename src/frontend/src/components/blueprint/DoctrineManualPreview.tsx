import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportAsText, exportAsMarkdown } from '../../lib/exportText';

interface DoctrineManualPreviewProps {
  manual: string;
  blueprintName: string;
}

export function DoctrineManualPreview({ manual, blueprintName }: DoctrineManualPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Founder Doctrine Manual</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAsText(manual, `${blueprintName}-doctrine.txt`)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export .txt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAsMarkdown(manual, `${blueprintName}-doctrine.md`)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export .md
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {manual}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
