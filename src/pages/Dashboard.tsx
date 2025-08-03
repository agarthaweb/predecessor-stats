import React from 'react';
import { usePlayerContext } from '../contexts';
import { useTeamData } from '../hooks';
import Header from '../components/Header';
import PlayerCard from '../components/PlayerCard';
import TeamOverview from '../components/TeamOverview';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { teamUsernames } = usePlayerContext();
  const { players, isLoading, hasError } = useTeamData(teamUsernames);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Data</h2>
            <p className="text-gray-600">Unable to fetch player data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Team Overview Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Team Overview</h2>
          <TeamOverview players={players} />
        </section>

        {/* Individual Player Cards */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Player Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;