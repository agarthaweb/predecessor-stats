import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlayerProvider } from './contexts';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <div className="min-h-screen bg-gray-50">
          <Dashboard />
        </div>
      </PlayerProvider>
    </QueryClientProvider>
  );
}

export default App;