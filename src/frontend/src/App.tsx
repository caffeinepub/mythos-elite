import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { AppShell } from './components/layout/AppShell';
import { BlueprintPage } from './pages/BlueprintPage';
import { TwinPage } from './pages/TwinPage';
import { NarrativePage } from './pages/NarrativePage';
import { SimulatorPage } from './pages/SimulatorPage';

export type Section = 'blueprint' | 'twin' | 'narrative' | 'simulator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  const [activeSection, setActiveSection] = useState<Section>('blueprint');

  const renderSection = () => {
    switch (activeSection) {
      case 'blueprint':
        return <BlueprintPage />;
      case 'twin':
        return <TwinPage />;
      case 'narrative':
        return <NarrativePage />;
      case 'simulator':
        return <SimulatorPage />;
      default:
        return <BlueprintPage />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AppShell activeSection={activeSection} onSectionChange={setActiveSection}>
          {renderSection()}
        </AppShell>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
