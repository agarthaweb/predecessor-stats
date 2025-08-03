import React from 'react';
import type { Player } from '../types';

interface TeamOverviewProps {
  players: Player[];
}

const TeamOverview: React.FC<TeamOverviewProps> = ({ players }) => {
  const averageLevel = players.length > 0 ? 
    Math.round(players.reduce((acc, player) => acc + player.level, 0) / players.length) : 0;

  const averageMmr = players.length > 0 ? 
    Math.round(players.reduce((acc, player) => acc + player.mmr, 0) / players.length) : 0;

  const highestRank = players.reduce((highest, player) => {
    return player.rank_tier > (highest?.rank_tier || 0) ? player : highest;
  }, players[0]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{players.length}</div>
          <div className="text-gray-600 text-sm">Team Members</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{averageLevel}</div>
          <div className="text-gray-600 text-sm">Average Level</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{averageMmr}</div>
          <div className="text-gray-600 text-sm">Average MMR</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{highestRank?.rank || 'N/A'}</div>
          <div className="text-gray-600 text-sm">Highest Rank</div>
          {highestRank && (
            <div className="text-xs text-gray-500 mt-1">{highestRank.username}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;