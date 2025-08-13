import type { Hero } from './hero'
import type { Role } from './role'

export type PlayerStatisticsResponse = {
  matches_played: number,
  hours_played: number,
  avg_performance_score: number,
  avg_kda: number[],
  avg_kdar: number,
  winrate: number
  favorite_role: Role,
  favorite_hero: Hero
}