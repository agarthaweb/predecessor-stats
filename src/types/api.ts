export interface Player {
  id: string;
  username: string;
  level: number;
  rank: string;
  rank_tier: number;
  mmr: number;
  region: string;
  avatar_url?: string;
}

export interface PlayerStatistics {
  player_id: string;
  wins: number;
  losses: number;
  win_rate: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  avg_kills: number;
  avg_deaths: number;
  avg_assists: number;
  matches_played: number;
  time_played: number;
}

export interface Match {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  game_mode: string;
  map: string;
  region: string;
  winning_team: number;
  players: MatchPlayer[];
}

export interface MatchPlayer {
  player_id: string;
  username: string;
  team: number;
  hero: string;
  kills: number;
  deaths: number;
  assists: number;
  damage_dealt: number;
  damage_taken: number;
  healing_done: number;
  gold_earned: number;
  level: number;
  items: string[];
  won: boolean;
}

export interface HeroStatistics {
  hero: string;
  matches_played: number;
  wins: number;
  losses: number;
  win_rate: number;
  kills: number;
  deaths: number;
  assists: number;
  avg_kills: number;
  avg_deaths: number;
  avg_assists: number;
  kda: number;
  damage_dealt: number;
  damage_taken: number;
  healing_done: number;
  time_played: number;
}

export interface Hero {
  id: string;
  name: string;
  role: string;
  image_url: string;
  description?: string;
}

export interface CommonTeammate {
  player_id: string;
  username: string;
  matches_together: number;
  wins_together: number;
  win_rate_together: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type GameMode = 'pvp' | 'ranked' | 'custom' | 'brawl';
export type TimeFrame = '1D' | '1W' | '2W' | '3W' | '1M' | '2M' | '3M' | 'ALL';