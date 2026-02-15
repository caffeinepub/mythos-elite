import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { queryKeys } from './queryKeys';

export function useDemoData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.seedDemoData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blueprints });
      queryClient.invalidateQueries({ queryKey: queryKeys.artifacts });
      queryClient.invalidateQueries({ queryKey: queryKeys.twinDrafts });
      queryClient.invalidateQueries({ queryKey: queryKeys.playbooks });
      queryClient.invalidateQueries({ queryKey: queryKeys.scenarios });
    },
  });

  return {
    seedDemo: seedMutation.mutateAsync,
    isSeeding: seedMutation.isPending,
  };
}
