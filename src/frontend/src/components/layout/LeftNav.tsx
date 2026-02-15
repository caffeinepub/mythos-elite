import { Brain, MessageSquare, Megaphone, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Section } from '../../App';

interface LeftNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems = [
  {
    id: 'blueprint' as Section,
    label: 'Cognitive Blueprint',
    icon: Brain,
    description: 'Founder trait extraction',
  },
  {
    id: 'twin' as Section,
    label: 'AI Founder Twin',
    icon: MessageSquare,
    description: 'Cognitive simulation',
  },
  {
    id: 'narrative' as Section,
    label: 'Narrative Engine',
    icon: Megaphone,
    description: 'Legend architecture',
  },
  {
    id: 'simulator' as Section,
    label: 'Decision Simulator',
    icon: GitBranch,
    description: 'Scenario modeling',
  },
];

export function LeftNav({ activeSection, onSectionChange }: LeftNavProps) {
  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card hidden lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-all',
                'hover:bg-accent/50',
                isActive && 'bg-accent text-accent-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
              <div className="flex-1 min-w-0">
                <div className={cn('font-medium text-sm', isActive ? 'text-foreground' : 'text-foreground/90')}>
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
