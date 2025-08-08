import axios from 'axios';
import type {
  Player,
  PlayerStatistics,
  Match,
  HeroStatistics,
  Hero,
  CommonTeammate,
  GameMode
} from '../types';
import { mockPlayerApi } from './mockData';
import { realPlayerApi } from './realApi';

// Try real API first, fallback to mock data
const TRY_REAL_API_FIRST = true;

// Debug toggle - set to false to disable debug logging
// When enabled, detailed API call information will be logged to the browser console
// including raw API responses, transformed data, and player performance metrics
const DEBUG_API_CALLS = true;

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const playerApi = {
  getPlayerByUsername: async (username: string): Promise<Player> => {
    if (TRY_REAL_API_FIRST) {
      try {
        if (DEBUG_API_CALLS) console.log(`🔍 [DEBUGGER] Attempting to fetch real data for ${username}...`);
        const realData = await realPlayerApi.getPlayerByUsername(username);
        if (DEBUG_API_CALLS) console.log(`✅ [DEBUGGER] Successfully fetched real data for ${username}`);
        if (DEBUG_API_CALLS) console.log(`📊 [DEBUGGER] Player data for ${username}:`, {
          id: realData.id,
          username: realData.username,
          level: realData.level,
          rank: realData.rank,
          rank_tier: realData.rank_tier,
          mmr: realData.mmr,
          region: realData.region,
          avatar_url: realData.avatar_url
        });
        return realData;
      } catch (error) {
        if (DEBUG_API_CALLS) console.log(`❌ [DEBUGGER] Real API failed for ${username}, falling back to mock data:`, error);
        const mockData = await mockPlayerApi.getPlayerByUsername(username);
        if (DEBUG_API_CALLS) console.log(`📊 [DEBUGGER] Mock player data for ${username}:`, mockData);
        return mockData;
      }
    }
    const mockData = await mockPlayerApi.getPlayerByUsername(username);
    console.log(`📊 [DEBUGGER] Mock player data for ${username}:`, mockData);
    return mockData;
  },

  getPlayerStatistics: async (playerId: string): Promise<PlayerStatistics> => {
    if (TRY_REAL_API_FIRST) {
      try {
        if (DEBUG_API_CALLS) console.log(`🔍 [DEBUGGER] Attempting to fetch real statistics for ${playerId}...`);
        const realStats = await realPlayerApi.getPlayerStatistics(playerId);
        if (DEBUG_API_CALLS) console.log(`✅ [DEBUGGER] Successfully fetched real statistics for ${playerId}`);
        if (DEBUG_API_CALLS) console.log(`📈 [DEBUGGER] Player statistics for ${playerId}:`, {
          wins: realStats.wins,
          losses: realStats.losses,
          win_rate: `${(realStats.win_rate * 100).toFixed(1)}%`,
          matches_played: realStats.matches_played,
          kda: realStats.kda.toFixed(2),
          avg_kills: realStats.avg_kills.toFixed(1),
          avg_deaths: realStats.avg_deaths.toFixed(1),
          avg_assists: realStats.avg_assists.toFixed(1),
          time_played: `${(realStats.time_played / 3600).toFixed(1)} hours`
        });
        return realStats;
      } catch (error) {
        if (DEBUG_API_CALLS) console.log(`❌ [DEBUGGER] Real API failed for ${playerId} stats, falling back to mock data:`, error);
        const mockStats = await mockPlayerApi.getPlayerStatistics(playerId);
        if (DEBUG_API_CALLS) console.log(`📈 [DEBUGGER] Mock player statistics for ${playerId}:`, mockStats);
        return mockStats;
      }
    }
    const mockStats = await mockPlayerApi.getPlayerStatistics(playerId);
    console.log(`📈 [DEBUGGER] Mock player statistics for ${playerId}:`, mockStats);
    return mockStats;
  },

  getPlayerMatches: async (
    playerId: string,
    limit: number = 20,
    gameMode?: GameMode
  ): Promise<Match[]> => {
    if (TRY_REAL_API_FIRST) {
      try {
        if (DEBUG_API_CALLS) console.log(`🔍 [DEBUGGER] Attempting to fetch real matches for ${playerId}...`);
        const realMatches = await realPlayerApi.getPlayerMatches(playerId, limit);
        if (DEBUG_API_CALLS) console.log(`✅ [DEBUGGER] Successfully fetched real matches for ${playerId}`);
        if (DEBUG_API_CALLS) console.log(`🎮 [DEBUGGER] Match data for ${playerId} (${realMatches.length} matches):`, 
          realMatches.map(match => ({
            id: match.id,
            duration: `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`,
            game_mode: match.game_mode,
            winning_team: match.winning_team,
            player_performance: match.players.find(p => p.player_id === playerId) ? {
              hero: match.players.find(p => p.player_id === playerId)?.hero,
              kills: match.players.find(p => p.player_id === playerId)?.kills,
              deaths: match.players.find(p => p.player_id === playerId)?.deaths,
              assists: match.players.find(p => p.player_id === playerId)?.assists,
              won: match.players.find(p => p.player_id === playerId)?.won
            } : 'Player not found in match'
          }))
        );
        return realMatches;
      } catch (error) {
        if (DEBUG_API_CALLS) console.log(`❌ [DEBUGGER] Real API failed for ${playerId} matches, falling back to mock data:`, error);
        const mockMatches = await mockPlayerApi.getPlayerMatches(playerId, limit);
        if (DEBUG_API_CALLS) console.log(`🎮 [DEBUGGER] Mock match data for ${playerId}:`, mockMatches);
        return mockMatches;
      }
    }
    const mockMatches = await mockPlayerApi.getPlayerMatches(playerId, limit);
    console.log(`🎮 [DEBUGGER] Mock match data for ${playerId}:`, mockMatches);
    return mockMatches;
  },

  getPlayerHeroStatistics: async (playerId: string): Promise<HeroStatistics[]> => {
    const response = await api.get(`/players/${playerId}/hero_statistics.json`);
    return response.data;
  },

  getCommonTeammates: async (playerId: string): Promise<CommonTeammate[]> => {
    const response = await api.get(`/players/${playerId}/common_teammates.json`);
    return response.data;
  },
};

export const matchApi = {
  getMatchDetails: async (matchId: string): Promise<Match> => {
    const response = await api.get(`/matches/${matchId}.json`);
    return response.data;
  },
};

export const heroApi = {
  getAllHeroes: async (): Promise<Hero[]> => {
    const response = await api.get('/heroes.json');
    return response.data;
  },

  getGlobalHeroStatistics: async (): Promise<HeroStatistics[]> => {
    const response = await api.get('/dashboard/hero_statistics.json');
    return response.data;
  },
};

export const apiService = {
  player: playerApi,
  match: matchApi,
  hero: heroApi,
};

export default apiService;