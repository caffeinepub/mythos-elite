import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';
import type { Blueprint, Trait } from '../../backend';

export function useBlueprints() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<Blueprint[]>({
    queryKey: queryKeys.blueprints,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlueprints();
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, name, traits }: { id: string; name: string; traits: Trait[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveBlueprint(id, name, traits);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blueprints });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteBlueprint(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blueprints });
    },
  });

  return {
    blueprints: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    saveBlueprint: saveMutation.mutateAsync,
    deleteBlueprint: deleteMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
