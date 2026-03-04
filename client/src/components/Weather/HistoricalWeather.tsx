import { useState } from 'react';
import { Calendar, History, Loader2, Gauge, Sun } from 'lucide-react';
import { GlassCard } from '../UI/GlassCard';
import { GlassButton } from '../UI/GlassButton';
import { useHistorical } from '../../hooks/useWeather';
import { Units } from '../../types/weather';
import {
  formatTemperature,
} from '../../utils/formatters';

interface HistoricalWeatherProps {
  query: string;
  units: Units;
}

export const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({
  query,
  units,
}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const { data, isLoading, error, refetch } = useHistorical(
    query,
    selectedDate,
    units
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSearch = () => {
    if (selectedDate) {
      refetch();
    }
  };

  // Get max date (yesterday) and min date (1 year ago)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = yesterday.toISOString().split('T')[0];

  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const minDate = oneYearAgo.toISOString().split('T')[0];

  const historicalData = data?.historical?.[selectedDate];

  return (
    <div className="space-y-6">
      <GlassCard>
        <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <History className="w-6 h-6 text-secondary-light" />
          Historical Weather Data
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-slate-400 mb-2">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={minDate}
                max={maxDate}
                className="glass-input w-full pl-12"
              />
            </div>
          </div>
          <div className="flex items-end">
            <GlassButton
              onClick={handleSearch}
              disabled={!selectedDate || isLoading}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Get Historical Data'
              )}
            </GlassButton>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Available data: Past year up to yesterday
        </p>
      </GlassCard>

      {error && (
        <GlassCard className="border-red-500/30 bg-red-500/10">
          <p className="text-red-400">
            Failed to fetch historical data. Please try again.
          </p>
        </GlassCard>
      )}

      {historicalData && (
        <div className="space-y-6 animate-fade-in">
          <GlassCard>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Weather Summary for {selectedDate}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/5">
                <p className="text-3xl font-bold text-slate-100">
                  {formatTemperature(historicalData.avgtemp, units)}
                </p>
                <p className="text-sm text-slate-400">Average</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <p className="text-3xl font-bold text-slate-100">
                  {formatTemperature(historicalData.maxtemp, units)}
                </p>
                <p className="text-sm text-slate-400">High</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <p className="text-3xl font-bold text-slate-100">
                  {formatTemperature(historicalData.mintemp, units)}
                </p>
                <p className="text-sm text-slate-400">Low</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <p className="text-3xl font-bold text-slate-100">
                  {historicalData.uv_index}
                </p>
                <p className="text-sm text-slate-400">UV Index</p>
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                Sun & Moon
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sunrise</span>
                  <span className="text-slate-100 font-medium">
                    {historicalData.astro.sunrise}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sunset</span>
                  <span className="text-slate-100 font-medium">
                    {historicalData.astro.sunset}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Moonrise</span>
                  <span className="text-slate-100 font-medium">
                    {historicalData.astro.moonrise}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Moonset</span>
                  <span className="text-slate-100 font-medium">
                    {historicalData.astro.moonset}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Moon Phase</span>
                    <span className="text-slate-100 font-medium">
                      {historicalData.astro.moon_phase}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-secondary-light" />
                Day Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sun Hours</span>
                  <span className="text-slate-100 font-medium">
                    {historicalData.sunhour}h
                  </span>
                </div>
                {historicalData.totalsnow > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Snow</span>
                    <span className="text-slate-100 font-medium">
                      {historicalData.totalsnow}cm
                    </span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <p className="text-sm text-slate-500">
                    Historical data shows the weather conditions recorded throughout the selected date.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {!historicalData && !isLoading && !error && selectedDate && (
        <GlassCard className="text-center py-12">
          <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">
            Click "Get Historical Data" to view weather information for {selectedDate}
          </p>
        </GlassCard>
      )}
    </div>
  );
};
