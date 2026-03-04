import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { ForecastDay, Units } from '../../types/weather';
import { formatTemperature, getDayName, getShortDayName } from '../../utils/formatters';
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react';

interface ForecastListProps {
  forecast: { [date: string]: ForecastDay };
  units: Units;
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecast, units }) => {
  const forecastDays = Object.values(forecast).slice(0, 7);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-100">7-Day Forecast</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Forecast */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {forecastDays.map((day) => (
          <GlassCard
            key={day.date}
            className="min-w-[200px] snap-center flex-shrink-0"
          >
            <div className="text-center">
              <p className="text-sm text-slate-400">{getDayName(day.date)}</p>
              <p className="text-xs text-slate-500">{getShortDayName(day.date)}</p>
              
              <div className="my-4">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-2xl font-bold text-slate-100">
                    {formatTemperature(day.maxtemp, units)}
                  </span>
                  <span className="text-lg text-slate-400">
                    / {formatTemperature(day.mintemp, units)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Sunrise</span>
                  <span className="text-slate-200">{day.astro.sunrise}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sunset</span>
                  <span className="text-slate-200">{day.astro.sunset}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>UV Index</span>
                  <span className="text-slate-200">{day.uv_index}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Detailed Daily Breakdown */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-200">Detailed Forecast</h3>
        {forecastDays.map((day) => (
          <GlassCard key={day.date} className="hover:bg-white/5" hover={false}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[80px]">
                  <p className="font-semibold text-slate-200">{getShortDayName(day.date)}</p>
                  <p className="text-xs text-slate-500">{day.date}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-100">
                    {formatTemperature(day.avgtemp, units)}
                  </span>
                  <div className="text-sm text-slate-400">
                    <span className="text-slate-300">H: {formatTemperature(day.maxtemp, units)}</span>
                    <span className="mx-2">|</span>
                    <span>L: {formatTemperature(day.mintemp, units)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-400">{day.sunhour}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">UV:</span>
                  <span className="text-slate-200">{day.uv_index}</span>
                </div>
                {day.totalsnow > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Snow:</span>
                    <span className="text-slate-200">{day.totalsnow}cm</span>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
