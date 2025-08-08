import type { Player, PlayerStatistics, Match, MatchPlayer } from '../types';

// Debug toggle for real API calls - should match the setting in api.ts
// Set to false to disable debug logging of external API calls and data transformation
const DEBUG_API_CALLS = true;

// Real player IDs
const PLAYER_IDS = {
  gravefolk: 'ff56b1e0-9290-4ba3-8065-190576c12063',
  amodestone: 'fc63088e-1512-4d47-8d1a-9eb92bc1d36f',
  anegotisticalone: '0dc7ac8d-aa4e-451f-b42c-dbb9d4127300',
  laggingloki: '7812c645-f57a-4019-9eec-db421e40e349',
};

// Simple fetch with proper headers
async function fetchWithHeaders(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

export const realPlayerApi = {
  getPlayerByUsername: async (username: string): Promise<Player> => {
    const playerId = PLAYER_IDS[username.toLowerCase() as keyof typeof PLAYER_IDS];
    if (!playerId) {
      throw new Error(`Player ${username} not found in known IDs`);
    }

    if (DEBUG_API_CALLS) console.log(`🌐 [DEBUGGER] Fetching raw player data from omeda.city for ${username} (${playerId})`);
    const playerData = await fetchWithHeaders(`https://omeda.city/players/${playerId}.json`);
    if (DEBUG_API_CALLS) console.log(`📥 [DEBUGGER] Raw API response for ${username}:`, playerData);
    
    const transformedData = {
      id: playerId,
      username: playerData.display_name || username,
      level: playerData.vp_total || 0,
      rank: playerData.rank_title || 'Unranked',
      rank_tier: playerData.rank || 0,
      mmr: playerData.vp_current || 0,
      region: playerData.region || 'unknown',
    };
    
    if (DEBUG_API_CALLS) console.log(`🔄 [DEBUGGER] Transformed player data for ${username}:`, transformedData);
    return transformedData;
  },

  getPlayerStatistics: async (playerId: string): Promise<PlayerStatistics> => {
    if (DEBUG_API_CALLS) console.log(`🌐 [DEBUGGER] Fetching raw statistics data from omeda.city for ${playerId}`);
    const statsData = await fetchWithHeaders(`https://omeda.city/players/${playerId}/statistics.json`);
    if (DEBUG_API_CALLS) console.log(`📥 [DEBUGGER] Raw statistics API response for ${playerId}:`, statsData);
    
    const transformedStats = {
      player_id: playerId,
      wins: Math.round(statsData.matches_played * statsData.winrate),
      losses: Math.round(statsData.matches_played * (1 - statsData.winrate)),
      win_rate: statsData.winrate,
      kills: statsData.average_kda?.[0] * statsData.matches_played || 0,
      deaths: statsData.average_kda?.[1] * statsData.matches_played || 0,
      assists: statsData.average_kda?.[2] * statsData.matches_played || 0,
      kda: statsData.average_kdar || 0,
      avg_kills: statsData.average_kda?.[0] || 0,
      avg_deaths: statsData.average_kda?.[1] || 0,
      avg_assists: statsData.average_kda?.[2] || 0,
      matches_played: statsData.matches_played,
      time_played: statsData.hours_played * 3600,
    };
    
    if (DEBUG_API_CALLS) console.log(`🔄 [DEBUGGER] Transformed statistics data for ${playerId}:`, transformedStats);
    return transformedStats;
  },

  getPlayerMatches: async (playerId: string, limit: number = 20): Promise<Match[]> => {
    try {
      if (DEBUG_API_CALLS) console.log(`🌐 [DEBUGGER] Fetching raw matches data from omeda.city for ${playerId}`);
      const matchesData = await fetchWithHeaders(`https://omeda.city/players/${playerId}/matches.json`);
      if (DEBUG_API_CALLS) console.log(`📥 [DEBUGGER] Raw matches API response for ${playerId}:`, {
        total_matches: matchesData?.matches?.length || 0,
        structure: matchesData ? Object.keys(matchesData) : 'No data',
        sample_match: matchesData?.matches?.[0] || 'No matches'
      });
      
      // The API returns { matches: [...] } structure
      if (matchesData && matchesData.matches && Array.isArray(matchesData.matches)) {
        const rawMatches = matchesData.matches.slice(0, limit);
        if (DEBUG_API_CALLS) console.log(`🔄 [DEBUGGER] Processing ${rawMatches.length} matches for ${playerId}`);
        
        // Transform raw API data to our Match interface
        return rawMatches.map((rawMatch: any): Match => {
          // Convert team strings to numbers: "dawn" = 1, "dusk" = 2
          const teamMap: Record<string, number> = { dawn: 1, dusk: 2 };
          const winningTeam = teamMap[rawMatch.winning_team] || 1;
          
          // Transform players
          const players: MatchPlayer[] = rawMatch.players.map((p: any): MatchPlayer => ({
            player_id: p.id,
            username: p.display_name,
            team: teamMap[p.team] || 1,
            hero: `hero_${p.hero_id}`, // We'll need to map hero IDs to names later
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            damage_dealt: p.total_damage_dealt,
            damage_taken: p.total_damage_taken,
            healing_done: p.total_healing_done,
            gold_earned: p.gold_earned,
            level: p.level,
            items: [], // The API has inventory_data as numbers, not item names
            won: teamMap[p.team] === winningTeam,
          }));
          
          return {
            id: rawMatch.id,
            start_time: rawMatch.start_time,
            end_time: rawMatch.end_time,
            duration: rawMatch.game_duration,
            game_mode: rawMatch.game_mode,
            map: 'Monolith', // Default map name
            region: rawMatch.region,
            winning_team: winningTeam,
            players,
          };
        });
      }
      
      if (DEBUG_API_CALLS) console.log(`❌ [DEBUGGER] Unexpected matches data structure for ${playerId}:`, matchesData);
      return [];
    } catch (error) {
      if (DEBUG_API_CALLS) console.log(`❌ [DEBUGGER] Failed to fetch matches for ${playerId}:`, error);
      return [];
    }
  },
};