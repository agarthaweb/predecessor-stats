export type PlayerInformationResponse = {
  id: string,
  display_name: string,
  region: string,
  leaderboard_rank: number,
  top_percentage: number,
  vp_total: number,
  vp_current: number,
  is_active: boolean,
  rank: number,
  rank_title: string,
  rank_image: string,
  flags: unknown[]
}