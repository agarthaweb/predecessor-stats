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
        console.log(`Attempting to fetch real data for ${username}...`);
        const realData = await realPlayerApi.getPlayerByUsername(username);
        console.log(`✅ Successfully fetched real data for ${username}`);
        return realData;
      } catch (error) {
        console.log(`❌ Real API failed for ${username}, falling back to mock data:`, error);
        return mockPlayerApi.getPlayerByUsername(username);
      }
    }
    return mockPlayerApi.getPlayerByUsername(username);
  },

  getPlayerStatistics: async (playerId: string): Promise<PlayerStatistics> => {
    if (TRY_REAL_API_FIRST) {
      try {
        console.log(`Attempting to fetch real statistics for ${playerId}...`);
        const realStats = await realPlayerApi.getPlayerStatistics(playerId);
        console.log(`✅ Successfully fetched real statistics for ${playerId}`);
        return realStats;
      } catch (error) {
        console.log(`❌ Real API failed for ${playerId} stats, falling back to mock data:`, error);
        return mockPlayerApi.getPlayerStatistics(playerId);
      }
    }
    return mockPlayerApi.getPlayerStatistics(playerId);
  },

  getPlayerMatches: async (
    playerId: string,
    limit: number = 20,
    gameMode?: GameMode
  ): Promise<Match[]> => {
    if (TRY_REAL_API_FIRST) {
      try {
        console.log(`Attempting to fetch real matches for ${playerId}...`);
        const realMatches = await realPlayerApi.getPlayerMatches(playerId, limit);
        console.log(`✅ Successfully fetched real matches for ${playerId}`);
        return realMatches;
      } catch (error) {
        console.log(`❌ Real API failed for ${playerId} matches, falling back to mock data:`, error);
        return mockPlayerApi.getPlayerMatches(playerId, limit);
      }
    }
    return mockPlayerApi.getPlayerMatches(playerId, limit);
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