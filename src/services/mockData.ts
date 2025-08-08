import type { Player, PlayerStatistics, Match, MatchPlayer } from '../types';

export const mockPlayers: Player[] = [
  {
    id: 'xxx',
    username: 'xxx',
    level: 0,
    rank: 'xxx',
    rank_tier: 0,
    mmr: 0,
    region: 'xxx',
  },
  {
    id: 'xxx',
    username: 'xxx',
    level: 0,
    rank: 'xxx',
    rank_tier: 0,
    mmr: 0,
    region: 'xxx',
  },
  {
    id: 'xxx',
    username: 'xxx',
    level: 0,
    rank: 'xxx',
    rank_tier: 0,
    mmr: 0,
    region: 'xxx',
  },
  {
    id: 'xxx',
    username: 'xxx',
    level: 0,
    rank: 'xxx',
    rank_tier: 0,
    mmr: 0,
    region: 'xxx',
  },
];

export const mockPlayerStatistics: Record<string, PlayerStatistics> = {
  'xxx1': {
    player_id: 'xxx',
    wins: 0,
    losses: 0,
    win_rate: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    avg_kills: 0,
    avg_deaths: 0,
    avg_assists: 0,
    matches_played: 0,
    time_played: 0,
  },
  'xxx2': {
    player_id: 'xxx',
    wins: 0,
    losses: 0,
    win_rate: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    avg_kills: 0,
    avg_deaths: 0,
    avg_assists: 0,
    matches_played: 0,
    time_played: 0,
  },
  'xxx3': {
    player_id: 'xxx',
    wins: 0,
    losses: 0,
    win_rate: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    avg_kills: 0,
    avg_deaths: 0,
    avg_assists: 0,
    matches_played: 0,
    time_played: 0,
  },
  'xxx4': {
    player_id: 'xxx',
    wins: 0,
    losses: 0,
    win_rate: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    avg_kills: 0,
    avg_deaths: 0,
    avg_assists: 0,
    matches_played: 0,
    time_played: 0,
  },
};

export const mockRecentMatches: Record<string, Match[]> = {
  'xxx': [
    {
      id: 'xxx',
      start_time: 'xxx',
      end_time: 'xxx',
      duration: 0,
      game_mode: 'xxx',
      map: 'xxx',
      region: 'xxx',
      winning_team: 0,
      players: [
        {
          player_id: 'xxx',
          username: 'xxx',
          team: 0,
          hero: 'xxx',
          kills: 0,
          deaths: 0,
          assists: 0,
          damage_dealt: 0,
          damage_taken: 0,
          healing_done: 0,
          gold_earned: 0,
          level: 0,
          items: ['xxx'],
          won: false,
        } as MatchPlayer,
      ],
    },
    {
      id: 'xxx',
      start_time: 'xxx',
      end_time: 'xxx',
      duration: 0,
      game_mode: 'xxx',
      map: 'xxx',
      region: 'xxx',
      winning_team: 0,
      players: [
        {
          player_id: 'xxx',
          username: 'xxx',
          team: 0,
          hero: 'xxx',
          kills: 0,
          deaths: 0,
          assists: 0,
          damage_dealt: 0,
          damage_taken: 0,
          healing_done: 0,
          gold_earned: 0,
          level: 0,
          items: ['xxx'],
          won: false,
        } as MatchPlayer,
      ],
    },
  ],
};

// Mock API functions
export const mockPlayerApi = {
  getPlayerByUsername: async (username: string): Promise<Player> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const player = mockPlayers.find(p => p.username.toLowerCase() === username.toLowerCase());
    if (!player) {
      throw new Error(`Player ${username} not found`);
    }
    return player;
  },

  getPlayerStatistics: async (playerId: string): Promise<PlayerStatistics> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const stats = mockPlayerStatistics[playerId];
    if (!stats) {
      throw new Error(`Statistics for player ${playerId} not found`);
    }
    return stats;
  },

  getPlayerMatches: async (playerId: string, limit: number = 20): Promise<Match[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const matches = mockRecentMatches[playerId] || [];
    return matches.slice(0, limit);
  },
};