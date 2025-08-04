import type { Player, PlayerStatistics, Match, MatchPlayer } from '../types';

export const mockPlayers: Player[] = [
  {
    id: 'ff56b1e0-9290-4ba3-8065-190576c12063',
    username: 'gravefolk',
    level: 300,
    rank: 'Silver III',
    rank_tier: 20,
    mmr: 1250,
    region: 'naeast',
  },
  {
    id: 'fc63088e-1512-4d47-8d1a-9eb92bc1d36f',
    username: 'amodestone',
    level: 285,
    rank: 'Silver II',
    rank_tier: 19,
    mmr: 1180,
    region: 'naeast',
  },
  {
    id: '0dc7ac8d-aa4e-451f-b42c-dbb9d4127300',
    username: 'anegotisticalone',
    level: 320,
    rank: 'Gold I',
    rank_tier: 25,
    mmr: 1420,
    region: 'naeast',
  },
  {
    id: '7812c645-f57a-4019-9eec-db421e40e349',
    username: 'laggingloki',
    level: 275,
    rank: 'Silver I',
    rank_tier: 21,
    mmr: 1320,
    region: 'naeast',
  },
];

export const mockPlayerStatistics: Record<string, PlayerStatistics> = {
  'ff56b1e0-9290-4ba3-8065-190576c12063': {
    player_id: 'ff56b1e0-9290-4ba3-8065-190576c12063',
    wins: 348,
    losses: 358,
    win_rate: 0.4929,
    kills: 1574,
    deaths: 2928,
    assists: 5104,
    kda: 2.28,
    avg_kills: 2.23,
    avg_deaths: 4.15,
    avg_assists: 7.23,
    matches_played: 706,
    time_played: 1288584, // 357.94 hours in seconds
  },
  'fc63088e-1512-4d47-8d1a-9eb92bc1d36f': {
    player_id: 'fc63088e-1512-4d47-8d1a-9eb92bc1d36f',
    wins: 245,
    losses: 235,
    win_rate: 0.5104,
    kills: 1200,
    deaths: 1920,
    assists: 3360,
    kda: 2.375,
    avg_kills: 2.5,
    avg_deaths: 4.0,
    avg_assists: 7.0,
    matches_played: 480,
    time_played: 864000, // 240 hours in seconds
  },
  '0dc7ac8d-aa4e-451f-b42c-dbb9d4127300': {
    player_id: '0dc7ac8d-aa4e-451f-b42c-dbb9d4127300',
    wins: 412,
    losses: 288,
    win_rate: 0.5886,
    kills: 1890,
    deaths: 2100,
    assists: 4900,
    kda: 3.23,
    avg_kills: 2.7,
    avg_deaths: 3.0,
    avg_assists: 7.0,
    matches_played: 700,
    time_played: 1260000, // 350 hours in seconds
  },
  '7812c645-f57a-4019-9eec-db421e40e349': {
    player_id: '7812c645-f57a-4019-9eec-db421e40e349',
    wins: 198,
    losses: 202,
    win_rate: 0.495,
    kills: 1000,
    deaths: 1600,
    assists: 2800,
    kda: 2.375,
    avg_kills: 2.5,
    avg_deaths: 4.0,
    avg_assists: 7.0,
    matches_played: 400,
    time_played: 720000, // 200 hours in seconds
  },
};

export const mockRecentMatches: Record<string, Match[]> = {
  'ff56b1e0-9290-4ba3-8065-190576c12063': [
    {
      id: 'match1',
      start_time: '2024-08-03T20:00:00Z',
      end_time: '2024-08-03T20:35:00Z',
      duration: 2100,
      game_mode: 'ranked',
      map: 'Monolith',
      region: 'naeast',
      winning_team: 1,
      players: [
        {
          player_id: 'ff56b1e0-9290-4ba3-8065-190576c12063',
          username: 'gravefolk',
          team: 1,
          hero: 'Murdock',
          kills: 8,
          deaths: 3,
          assists: 12,
          damage_dealt: 45000,
          damage_taken: 15000,
          healing_done: 2000,
          gold_earned: 12000,
          level: 18,
          items: ['Infinity Edge', 'Phantom Dancer', 'Lord Dominik\'s Regards'],
          won: true,
        } as MatchPlayer,
      ],
    },
    {
      id: 'match2',
      start_time: '2024-08-03T19:00:00Z',
      end_time: '2024-08-03T19:28:00Z',
      duration: 1680,
      game_mode: 'ranked',
      map: 'Monolith',
      region: 'naeast',
      winning_team: 2,
      players: [
        {
          player_id: 'ff56b1e0-9290-4ba3-8065-190576c12063',
          username: 'gravefolk',
          team: 1,
          hero: 'Twinblast',
          kills: 4,
          deaths: 7,
          assists: 6,
          damage_dealt: 32000,
          damage_taken: 25000,
          healing_done: 1500,
          gold_earned: 8500,
          level: 15,
          items: ['Blade of Torment', 'Vampiric Blade'],
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