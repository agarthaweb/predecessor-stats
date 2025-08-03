import React from 'react';
import { usePlayerStatistics, usePlayerMatches } from '../hooks';
import type { Player } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { data: statistics, isLoading: statsLoading } = usePlayerStatistics(player.id);
  const { data: recentMatches, isLoading: matchesLoading } = usePlayerMatches(player.id, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Player Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {player.avatar_url ? (
            <img
              src={player.avatar_url}
              alt={player.username}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-lg">
                {player.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-gray-800">{player.username}</h3>
            <div className="text-sm text-gray-600">Level {player.level}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{player.rank}</div>
          <div className="text-sm text-gray-600">{player.mmr} MMR</div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Statistics</h4>
        {statsLoading ? (
          <LoadingSpinner size="small" />
        ) : statistics ? (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{statistics.wins}</div>
              <div className="text-xs text-gray-600">Wins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{statistics.losses}</div>
              <div className="text-xs text-gray-600">Losses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {(statistics.win_rate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Win Rate</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No statistics available</div>
        )}
      </div>

      {/* KDA */}
      {statistics && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Average KDA</h4>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-green-600 font-bold">{statistics.avg_kills.toFixed(1)}</span>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-bold">{statistics.avg_deaths.toFixed(1)}</span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-bold">{statistics.avg_assists.toFixed(1)}</span>
            <span className="ml-2 text-purple-600 font-bold">({statistics.kda.toFixed(2)})</span>
          </div>
        </div>
      )}

      {/* Recent Matches */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Matches</h4>
        {matchesLoading ? (
          <LoadingSpinner size="small" />
        ) : recentMatches && recentMatches.length > 0 ? (
          <div className="space-y-1">
            {recentMatches.slice(0, 3).map((match) => {
              const playerMatch = match.players.find(p => p.player_id === player.id);
              return playerMatch ? (
                <div
                  key={match.id}
                  className={`text-xs px-2 py-1 rounded flex justify-between items-center ${
                    playerMatch.won ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  <span>{playerMatch.hero}</span>
                  <span>
                    {playerMatch.kills}/{playerMatch.deaths}/{playerMatch.assists}
                  </span>
                  <span>{playerMatch.won ? 'W' : 'L'}</span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No recent matches</div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;