import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';
import type { Playbook } from '../../backend';

export function usePlaybooks() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<Playbook[]>({
    queryKey: queryKeys.playbooks,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlaybooks();
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, title, audience, constraints, content }: { 
      id: string; 
      title: string; 
      audience: string; 
      constraints: string; 
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.savePlaybook(id, title, audience, constraints, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.playbooks });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deletePlaybook(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.playbooks });
    },
  });

  return {
    playbooks: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    savePlaybook: saveMutation.mutateAsync,
    deletePlaybook: deleteMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
