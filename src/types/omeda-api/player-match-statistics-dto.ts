import type { Role } from './role';
import type { Team } from './team';

/**
 * Player Match Statistics Data Transfer Object (DTO)
 */
export type PlayerMatchStatisticsDto = {
  /** Unique identifier for the player match statistics */
  id: string,
  
  /** Display name of the player */
  display_name: string,
  
  /** Flags associated with the player (reserved for future use) */
  flags: [],
  
  /** Team information for the player */
  team: Team,
  
  /** ID of the hero played by the player */
  hero_id: number,
  
  /** Role played by the player (e.g., Carry, Support) */
  role: Role,
  
  /** Total minions killed by the player */
  minions_killed: number,
  
  /** Lane minions killed by the player */
  lane_minions_killed: number,
  
  /** Neutral minions killed by the player */
  neutral_minions_killed: number,
  
  /** Neutral minions killed in the team's jungle */
  neutral_minions_team_jungle: number,
  
  /** Neutral minions killed in the enemy's jungle */
  neutral_minions_enemy_jungle: number,
  
  /** Number of kills by the player */
  kills: number,
  
  /** Number of deaths of the player */
  deaths: number,
  
  /** Number of assists by the player */
  assists: number,
  
  /** Largest killing spree achieved by the player */
  largest_killing_spree: number,
  
  /** Largest multi-kill achieved by the player */
  largest_multi_kill: number,
  
  /** Total damage dealt by the player */
  total_damage_dealt: number,
  
  /** Physical damage dealt by the player */
  physical_damage_dealt: number,
  
  /** Magical damage dealt by the player */
  magical_damage_dealt: number,
  
  /** True damage dealt by the player */
  true_damage_dealt: number,
  
  /** Largest critical strike dealt by the player */
  largest_critical_strike: number,
  
  /** Total damage dealt to enemy heroes */
  total_damage_dealt_to_heroes: number,
  
  /** Physical damage dealt to enemy heroes */
  physical_damage_dealt_to_heroes: number,
  
  /** Magical damage dealt to enemy heroes */
  magical_damage_dealt_to_heroes: number,
  
  /** True damage dealt to enemy heroes */
  true_damage_dealt_to_heroes: number,
  
  /** Total damage dealt to structures (e.g., towers, inhibitors) */
  total_damage_dealt_to_structures: number,
  
  /** Total damage dealt to objectives (e.g., Fangtooth, Orb Prime) */
  total_damage_dealt_to_objectives: number,
  
  /** Total damage taken by the player */
  total_damage_taken: number,
  
  /** Physical damage taken by the player */
  physical_damage_taken: number,
  
  /** Magical damage taken by the player */
  magical_damage_taken: number,
  
  /** True damage taken by the player */
  true_damage_taken: number,
  
  /** Total damage taken from enemy heroes */
  total_damage_taken_from_heroes: number,
  
  /** Physical damage taken from enemy heroes */
  physical_damage_taken_from_heroes: number,
  
  /** Magical damage taken from enemy heroes */
  magical_damage_taken_from_heroes: number,
  
  /** True damage taken from enemy heroes */
  true_damage_taken_from_heroes: number,
  
  /** Total damage mitigated by the player */
  total_damage_mitigated: number,
  
  /** Total healing done by the player */
  total_healing_done: number,
  
  /** Healing done by items */
  item_healing_done: number,
  
  /** Healing done by crests */
  crest_healing_done: number,
  
  /** Healing done by utility effects */
  utility_healing_done: number,
  
  /** Total shielding received by the player */
  total_shielding_received: number,
  
  /** Number of wards placed by the player */
  wards_placed: number,
  
  /** Number of wards destroyed by the player */
  wards_destroyed: number,
  
  /** Total gold earned by the player */
  gold_earned: number,
  
  /** Total gold spent by the player */
  gold_spent: number,
  
  /** Gold earned at each interval during the match */
  gold_earned_at_interval: number[],
  
  /** Inventory data representing item IDs held by the player */
  inventory_data: number[],
  
  /** Performance score for the player (null if not available) */
  performance_score: null | number,
  
  /** Performance title for the player (null if not available) */
  performance_title: null | string,
  
  /** VP (Victory Points) earned by the player (null if not available) */
  vp: null | number,
  
  /** Player's rank at the end of the match */
  rank: number,
  
  /** Player's new rank after the match (null if not available) */
  rank_new: null | number,
  
  /** Total VP (Victory Points) accumulated by the player */
  vp_total: number,
  
  /** Level of the hero at the end of the match */
  hero_level: number,
  
  /** Player's level at the end of the match */
  level: number,

  /** Number of objectives killed by the player */
  objective_kills: number,

  /** Change in Victory Points (VP) after the match */
  vp_change: number
}