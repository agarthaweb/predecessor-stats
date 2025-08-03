import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Player } from '../types';

interface PlayerContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  teamUsernames: string[];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const teamUsernames = ['gravefolk', 'amodestone', 'anegotisticalone', 'laggingloki'];

  const value: PlayerContextType = {
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    teamUsernames,
    isLoading,
    setIsLoading,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};