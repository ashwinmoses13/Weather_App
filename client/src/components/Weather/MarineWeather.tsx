import React, { useState } from 'react';
import { Waves, MapPin, Loader2, Navigation, Droplets, Eye, Thermometer } from 'lucide-react';
import { GlassCard } from '../UI/GlassCard';
import { GlassButton } from '../UI/GlassButton';
import { GlassInput } from '../UI/GlassInput';
import { useMarine } from '../../hooks/useWeather';
import { Units } from '../../types/weather';

interface MarineWeatherProps {
  units: Units;
}

export const MarineWeather: React.FC<MarineWeatherProps> = ({ units }) => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data, isLoading, error } = useMarine(
    searchTriggered ? lat : '',
    searchTriggered ? lon : '',
    units
  );

  const handleSearch = () => {
    if (lat && lon) {
      setSearchTriggered(true);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toString());
          setLon(position.coords.longitude.toString());
        },
        (err) => {
          console.error('Error getting location:', err);
        }
      );
    }
  };

  const marine = data?.marine;

  return (
    <div className="space-y-6">
      <GlassCard>
        <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Waves className="w-6 h-6 text-cyan-400" />
          Marine Weather
        </h2>

        <p className="text-slate-400 mb-6">
          Get marine weather conditions for any location using coordinates. 
          Perfect for sailing, fishing, and marine activities.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Latitude</label>
            <GlassInput
              type="text"
              placeholder="e.g., 40.7128"
              value={lat}
              onChange={(e) => {
                setLat(e.target.value);
                setSearchTriggered(false);
              }}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Longitude</label>
            <GlassInput
              type="text"
              placeholder="e.g., -74.0060"
              value={lon}
              onChange={(e) => {
                setLon(e.target.value);
                setSearchTriggered(false);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <GlassButton
            onClick={handleSearch}
            disabled={!lat || !lon || isLoading}
            variant="primary"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Get Marine Data'
            )}
          </GlassButton>
          
          <GlassButton
            onClick={handleUseCurrentLocation}
            variant="accent"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use My Location
          </GlassButton>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-white/5 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Example coordinates: New York (40.7128, -74.0060), London (51.5074, -0.1278)
          </p>
        </div>
      </GlassCard>

      {error && (
        <GlassCard className="border-red-500/30 bg-red-500/10">
          <p className="text-red-400">
            Failed to fetch marine data. Please check your coordinates and try again.
          </p>
        </GlassCard>
      )}

      {marine && data?.location && (
        <div className="space-y-6 animate-fade-in">
          <GlassCard>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              Location
            </h3>
            <p className="text-2xl font-bold text-slate-100">
              {data.location.name}
            </p>
            <p className="text-slate-400">
              {data.location.region}, {data.location.country}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Coordinates: {data.location.lat}, {data.location.lon}
            </p>
          </GlassCard>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <GlassCard className="text-center">
              <Thermometer className="w-6 h-6 text-secondary-light mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.water_temperature}°
              </p>
              <p className="text-sm text-slate-400">Water Temp</p>
            </GlassCard>

            <GlassCard className="text-center">
              <Waves className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.wave_height}m
              </p>
              <p className="text-sm text-slate-400">Wave Height</p>
              <p className="text-xs text-slate-500 mt-1">
                {marine.wave_direction}
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <Navigation className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.wave_period}s
              </p>
              <p className="text-sm text-slate-400">Wave Period</p>
            </GlassCard>

            <GlassCard className="text-center">
              <Waves className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.swell_height}m
              </p>
              <p className="text-sm text-slate-400">Swell Height</p>
              <p className="text-xs text-slate-500 mt-1">
                {marine.swell_direction}
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <Eye className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.visibility}km
              </p>
              <p className="text-sm text-slate-400">Visibility</p>
            </GlassCard>

            <GlassCard className="text-center">
              <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-100">
                {marine.water_depth}m
              </p>
              <p className="text-sm text-slate-400">Water Depth</p>
            </GlassCard>
          </div>

          <GlassCard>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Marine Conditions Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">Swell Period</span>
                <span className="text-slate-100 font-medium">
                  {marine.swell_period}s
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Overall Conditions</span>
                <span className="text-accent font-medium">
                  {marine.wave_height < 1
                    ? 'Calm'
                    : marine.wave_height < 2
                    ? 'Moderate'
                    : 'Rough'}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {!marine && !isLoading && !error && searchTriggered && (
        <GlassCard className="text-center py-12">
          <Waves className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">
            No marine data available for these coordinates.
          </p>
        </GlassCard>
      )}
    </div>
  );
};
