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

const API_BASE_URL = 'https://api.predecessor.com';

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
    const response = await api.get(`/players.json?username=${username}`);
    return response.data;
  },

  getPlayerStatistics: async (playerId: string): Promise<PlayerStatistics> => {
    const response = await api.get(`/players/${playerId}/statistics.json`);
    return response.data;
  },

  getPlayerMatches: async (
    playerId: string,
    limit: number = 20,
    gameMode?: GameMode
  ): Promise<Match[]> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(gameMode && { game_mode: gameMode }),
    });
    const response = await api.get(`/players/${playerId}/matches.json?${params}`);
    return response.data;
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