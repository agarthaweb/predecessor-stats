import type { PlayerMatchStatisticsDto } from './player-match-statistics-dto';
import type { Team } from './team';

export type MatchDetailsDto = {
  /**
   * Match I.D.
   * @description Match unique identifier (i.e., GUID)
   */
  id: string;

  /**
   * Match Start Time
   * @description Match start time in ISO 8601 format/string.
   */
  start_time: string;

  /**
   * Match End Time
   * @description Match end time in ISO 8601 format/string.
   */
  end_time: string;

  /**
   * The match duration in seconds [s].
   */
  game_duration: number;

  game_region: string;

  region: string;

  /**
   * The winning team of the match.
   */
  winning_team: Team;

  game_mode: string;

  /**
   * An array containing the match statistics for each player.
   */
  players: PlayerMatchStatisticsDto[];
}