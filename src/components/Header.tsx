import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Predecessor Stats</h1>
            <p className="text-gray-600 mt-1">Team Dashboard for gravefolk, amodestone, anegotisticalone & laggingloki</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Live Data
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;