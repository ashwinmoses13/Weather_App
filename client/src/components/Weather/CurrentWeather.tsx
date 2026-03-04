import React from 'react';
import {
  Droplets,
  Wind,
  Eye,
  Sun,
  Navigation,
  Gauge,
  Cloud,
} from 'lucide-react';
import { GlassCard } from '../UI/GlassCard';
import { CurrentWeather as CurrentWeatherType, Units } from '../../types/weather';
import { Location } from '../../types/weather';
import {
  formatTemperature,
  formatSpeed,
  formatPressure,
  formatDistance,
  formatLocalTime,
} from '../../utils/formatters';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: Location;
  units: Units;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  current,
  location,
  units,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">{location.name}</h2>
              <p className="text-slate-400 mt-1">
                {location.region}, {location.country}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {formatLocalTime(location.localtime)}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-6xl font-bold gradient-text">
                  {formatTemperature(current.temperature, units)}
                </div>
                <p className="text-lg text-slate-300 mt-1 capitalize">
                  {current.weather_descriptions[0]}
                </p>
              </div>
              {current.weather_icons[0] && (
                <img
                  src={current.weather_icons[0]}
                  alt={current.weather_descriptions[0]}
                  className="w-24 h-24 object-contain animate-float"
                />
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-slate-400">
              Feels like{' '}
              <span className="text-slate-200 font-semibold">
                {formatTemperature(current.feelslike, units)}
              </span>
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <GlassCard className="text-center">
          <Droplets className="w-6 h-6 text-secondary-light mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-100">{current.humidity}%</p>
          <p className="text-sm text-slate-400">Humidity</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Wind className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-100">
            {formatSpeed(current.wind_speed, units)}
          </p>
          <p className="text-sm text-slate-400">Wind</p>
          <p className="text-xs text-slate-500 mt-1">{current.wind_dir}</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-100">
            {formatPressure(current.pressure)}
          </p>
          <p className="text-sm text-slate-400">Pressure</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Eye className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-100">
            {formatDistance(current.visibility, units)}
          </p>
          <p className="text-sm text-slate-400">Visibility</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Cloud className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-100">{current.cloudcover}%</p>
          <p className="text-sm text-slate-400">Cloud Cover</p>
        </GlassCard>
      </div>

      {/* Astro & UV Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-400" />
            Sun & Moon
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Sunrise</span>
              <span className="text-slate-100 font-medium">{current.astro.sunrise}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Sunset</span>
              <span className="text-slate-100 font-medium">{current.astro.sunset}</span>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Moon Phase</span>
                <span className="text-slate-100 font-medium">{current.astro.moon_phase}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-secondary-light" />
            UV & Precipitation
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">UV Index</span>
              <span className="text-slate-100 font-medium">{current.uv_index}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Precipitation</span>
              <span className="text-slate-100 font-medium">{current.precip} mm</span>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Observation Time</span>
                <span className="text-slate-100 font-medium">{current.observation_time}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Air Quality Section */}
      {current.air_quality && (
        <GlassCard>
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Air Quality</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-slate-100">{current.air_quality['us-epa-index']}</p>
              <p className="text-xs text-slate-400">US EPA Index</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-slate-100">{current.air_quality.pm2_5}</p>
              <p className="text-xs text-slate-400">PM2.5</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-slate-100">{current.air_quality.pm10}</p>
              <p className="text-xs text-slate-400">PM10</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-slate-100">{current.air_quality.o3}</p>
              <p className="text-xs text-slate-400">Ozone (O3)</p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
