import { ReactNode } from 'react';
import { Header } from './Header';
import { LeftNav } from './LeftNav';
import type { Section } from '../../App';

interface AppShellProps {
  children: ReactNode;
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function AppShell({ children, activeSection, onSectionChange }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftNav activeSection={activeSection} onSectionChange={onSectionChange} />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
