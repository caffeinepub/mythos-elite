import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';
import type { TwinDraft } from '../../backend';

export function useTwinDrafts() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<TwinDraft[]>({
    queryKey: queryKeys.twinDrafts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTwinDrafts();
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, prompt, response }: { id: string; prompt: string; response: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveTwinDraft(id, prompt, response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.twinDrafts });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteTwinDraft(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.twinDrafts });
    },
  });

  return {
    twinDrafts: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    saveTwinDraft: saveMutation.mutateAsync,
    deleteTwinDraft: deleteMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
