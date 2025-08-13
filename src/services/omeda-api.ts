import type { PlayerStatisticsResponse } from '../types/omeda-api/player-statistics-response';
import type { PlayerInformationResponse } from '../types/omeda-api/player-information-response';
import type { PlayerMatchesResponse } from '../types/omeda-api/player-matches-response';
import type { PlayerHeroStatisticsResponse } from '../types/omeda-api/player-hero-statistics-response';

/**
 * Omeda.city API
 * @description A static class containing methods for fetching player
 * information from the {@link https://omeda.city | Omeda.city} public API
 * (which uses data the {@link https://www.predecessorgame.com | Predecessor} 
 * private API).
 */
export class OmedaApi {
  // Value set to relative "/api" route because a the web server proxies
  // requests made to this URL to https://omedia.city 
  static #API_URL = '/api';

  static async #fetch<T>(route: string): Promise<T> {
    const requestUrl = `${OmedaApi.#API_URL}${route}`;
    const options: RequestInit = { headers: { Accept: 'application/json' } };
    const response = await fetch(requestUrl, options);
    return (await response.json()) as T;
  }

  /**
   * Gets the general information about a player given their ID.
   * @param playerId Player ID
   */
  static async getPlayerInformation(playerId: string): Promise<PlayerInformationResponse> {
    const route = `/players/${playerId}.json`;
    return OmedaApi.#fetch(route);
  }

  /**
   * Gets general statistics about a player given their ID.
   * @param playerId Player ID
   */
  static async getPlayerStatistics(playerId: string): Promise<PlayerStatisticsResponse> {
    const route = `/players/${playerId}/statistics.json`;
    return OmedaApi.#fetch(route);
  }

  /**
   * Gets the match history of a player given their ID.
   * @param playerId Player ID
   * @param last Specifies the last number of matches that should be fetched.
   */
  static async getPlayerMatches(playerId: string, last: number = 10): Promise<PlayerMatchesResponse> {
    const route = `/players/${playerId}/matches.json?per_page=${last}`;
    return OmedaApi.#fetch<PlayerMatchesResponse>(route);
  }

  /**
   * Gets general statistics about the heroes a player plays and their
   * associated performance with each hero.
   * @param playerId Player ID
   */
  static async getPlayerHeroStatistics(playerId: string): Promise<PlayerHeroStatisticsResponse> {
    const route = `/players/${playerId}/hero_statistics.json`;
    return OmedaApi.#fetch(route);
  }
}