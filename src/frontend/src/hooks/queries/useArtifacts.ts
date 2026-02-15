import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';
import type { Artifact } from '../../backend';

export function useArtifacts() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<Artifact[]>({
    queryKey: queryKeys.artifacts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArtifacts();
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, name, content }: { id: string; name: string; content: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveArtifact(id, name, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artifacts });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteArtifact(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artifacts });
    },
  });

  return {
    artifacts: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    saveArtifact: saveMutation.mutateAsync,
    deleteArtifact: deleteMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
