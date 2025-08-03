import { useQuery, useQueries } from '@tanstack/react-query';
import { playerApi } from '../services';
import type { GameMode } from '../types';

export const usePlayer = (username: string) => {
  return useQuery({
    queryKey: ['player', username],
    queryFn: () => playerApi.getPlayerByUsername(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePlayerStatistics = (playerId: string) => {
  return useQuery({
    queryKey: ['playerStatistics', playerId],
    queryFn: () => playerApi.getPlayerStatistics(playerId),
    enabled: !!playerId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePlayerMatches = (playerId: string, limit: number = 20, gameMode?: GameMode) => {
  return useQuery({
    queryKey: ['playerMatches', playerId, limit, gameMode],
    queryFn: () => playerApi.getPlayerMatches(playerId, limit, gameMode),
    enabled: !!playerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const usePlayerHeroStatistics = (playerId: string) => {
  return useQuery({
    queryKey: ['playerHeroStatistics', playerId],
    queryFn: () => playerApi.getPlayerHeroStatistics(playerId),
    enabled: !!playerId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMultiplePlayers = (usernames: string[]) => {
  return useQueries({
    queries: usernames.map((username) => ({
      queryKey: ['player', username],
      queryFn: () => playerApi.getPlayerByUsername(username),
      enabled: !!username,
      staleTime: 5 * 60 * 1000,
    })),
  });
};

export const useTeamData = (usernames: string[]) => {
  const playerQueries = useMultiplePlayers(usernames);
  
  const players = playerQueries
    .filter(query => query.data)
    .map(query => query.data!);

  const isLoading = playerQueries.some(query => query.isLoading);
  const hasError = playerQueries.some(query => query.isError);

  return {
    players,
    isLoading,
    hasError,
    queries: playerQueries,
  };
};