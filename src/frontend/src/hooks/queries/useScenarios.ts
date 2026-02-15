import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';
import type { Scenario, Assumption, Branch } from '../../backend';

export function useScenarios() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<Scenario[]>({
    queryKey: queryKeys.scenarios,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScenarios();
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, name, assumptions, outcomeSummary, branches }: { 
      id: string; 
      name: string; 
      assumptions: Assumption[]; 
      outcomeSummary: string;
      branches: Branch[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveScenario(id, name, assumptions, outcomeSummary, branches);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scenarios });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteScenario(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scenarios });
    },
  });

  return {
    scenarios: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    saveScenario: saveMutation.mutateAsync,
    deleteScenario: deleteMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
