import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../services/api';
import { Units } from '../types/weather';

export const useCurrentWeather = (query: string, units: Units = 'm', language: string = 'en') => {
  return useQuery({
    queryKey: ['current', query, units, language],
    queryFn: () => weatherApi.getCurrent(query, units, language),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useForecast = (query: string, days: number = 7, units: Units = 'm', language: string = 'en') => {
  return useQuery({
    queryKey: ['forecast', query, days, units, language],
    queryFn: () => weatherApi.getForecast(query, days, units, language),
    enabled: query.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useHistorical = (query: string, date: string, units: Units = 'm', language: string = 'en') => {
  return useQuery({
    queryKey: ['historical', query, date, units, language],
    queryFn: () => weatherApi.getHistorical(query, date, units, language),
    enabled: query.length > 0 && date.length > 0,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - historical data doesn't change
  });
};

export const useMarine = (lat: string, lon: string, units: Units = 'm', language: string = 'en') => {
  return useQuery({
    queryKey: ['marine', lat, lon, units, language],
    queryFn: () => weatherApi.getMarine(lat, lon, units, language),
    enabled: lat.length > 0 && lon.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLocations = (query: string) => {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: () => weatherApi.searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 60 * 1000, // 1 minute
  });
};
