import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useDemoData } from '../../hooks/queries/useDemoData';
import { toast } from 'sonner';

export function Header() {
  const { seedDemo, isSeeding } = useDemoData();

  const handleLoadDemo = async () => {
    try {
      await seedDemo();
      toast.success('Demo data loaded successfully');
    } catch (error) {
      toast.error('Failed to load demo data');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/mythos-elite-wordmark.dim_1200x300.png" 
            alt="MythOS Elite" 
            className="h-8 w-auto"
          />
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground border-l border-border pl-4">
            <span className="font-medium">Prototype</span>
            <span>•</span>
            <span>Cognitive Infrastructure for Elite Founders</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleLoadDemo} 
            disabled={isSeeding}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {isSeeding && <Loader2 className="h-4 w-4 animate-spin" />}
            Load Demo Data
          </Button>
        </div>
      </div>
    </header>
  );
}
