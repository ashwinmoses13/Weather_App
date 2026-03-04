import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { TabNavigation } from './components/UI/TabNavigation';
import { LocationSearch } from './components/Search/LocationSearch';
import { FilterBar } from './components/Search/FilterBar';
import { CurrentWeather } from './components/Weather/CurrentWeather';
import { ForecastList } from './components/Weather/ForecastList';
import { HistoricalWeather } from './components/Weather/HistoricalWeather';
import { MarineWeather } from './components/Weather/MarineWeather';
import { GlassCard } from './components/UI/GlassCard';
import { useCurrentWeather, useForecast } from './hooks/useWeather';
import { Units } from './types/weather';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function WeatherApp() {
  const [activeTab, setActiveTab] = useState('current');
  const [location, setLocation] = useState('New York');
  const [units, setUnits] = useState<Units>('m');
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: currentData, isLoading: currentLoading, error: currentError } = useCurrentWeather(
    location,
    units,
    language
  );

  const { data: forecastData } = useForecast(
    location,
    7,
    units,
    language
  );

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };

  const renderContent = () => {
    if (currentLoading && activeTab === 'current') {
      return (
        <GlassCard className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-secondary-light animate-spin mb-4" />
          <p className="text-slate-400">Loading weather data...</p>
        </GlassCard>
      );
    }

    if (currentError) {
      return (
        <GlassCard className="border-red-500/30 bg-red-500/10">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Error loading weather data</p>
              <p className="text-sm">Please try again or check your location.</p>
            </div>
          </div>
        </GlassCard>
      );
    }

    switch (activeTab) {
      case 'current':
        return currentData ? (
          <CurrentWeather
            current={currentData.current}
            location={currentData.location}
            units={units}
          />
        ) : null;

      case 'forecast':
        return forecastData?.forecast ? (
          <ForecastList forecast={forecastData.forecast} units={units} />
        ) : (
          <GlassCard className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-secondary-light animate-spin mb-4" />
            <p className="text-slate-400">Loading forecast data...</p>
          </GlassCard>
        );

      case 'historical':
        return <HistoricalWeather query={location} units={units} />;

      case 'marine':
        return <MarineWeather units={units} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">
              Weather Intelligence
            </h2>
            <p className="text-slate-400">
              Real-time weather data, forecasts, and historical insights for any location worldwide.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <LocationSearch
                onSelect={handleLocationSelect}
                placeholder="Search for a city..."
              />
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Current: <span className="text-slate-200">{location}</span></span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mb-6">
            <FilterBar
              units={units}
              onUnitsChange={setUnits}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;
