import axios from 'axios';
import {
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
  MarineResponse,
  LocationsResponse,
  Units,
} from '../types/weather';
import { mockCurrentWeather, mockForecast, mockLocations } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_MOCK_DATA = true; // Set to false when using a valid Weatherstack API key

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherApi = {
  getCurrent: async (query: string, units: Units = 'm', language: string = 'en'): Promise<CurrentWeatherResponse> => {
    if (USE_MOCK_DATA) {
      return mockCurrentWeather(query);
    }
    const response = await apiClient.get('/current', {
      params: { query, units, language },
    });
    return response.data;
  },

  getForecast: async (query: string, days: number = 7, units: Units = 'm', language: string = 'en'): Promise<ForecastResponse> => {
    if (USE_MOCK_DATA) {
      return mockForecast(query);
    }
    const response = await apiClient.get('/forecast', {
      params: { query, forecast_days: days, units, language },
    });
    return response.data;
  },

  getHistorical: async (query: string, date: string, units: Units = 'm', language: string = 'en'): Promise<HistoricalResponse> => {
    if (USE_MOCK_DATA) {
      // Return mock forecast data as historical
      return mockForecast(query) as unknown as HistoricalResponse;
    }
    const response = await apiClient.get('/historical', {
      params: { query, historical_date: date, units, language },
    });
    return response.data;
  },

  getMarine: async (lat: string, lon: string, units: Units = 'm', language: string = 'en'): Promise<MarineResponse> => {
    const response = await apiClient.get('/marine', {
      params: { lat, lon, units, language },
    });
    return response.data;
  },

  searchLocations: async (query: string): Promise<LocationsResponse> => {
    if (USE_MOCK_DATA) {
      return mockLocations(query);
    }
    const response = await apiClient.get('/locations', {
      params: { query },
    });
    return response.data;
  },
};
