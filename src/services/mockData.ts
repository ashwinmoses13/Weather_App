import { CurrentWeatherResponse, ForecastResponse, LocationsResponse } from '../types/weather';

export const mockCurrentWeather = (query: string): CurrentWeatherResponse => ({
  request: {
    type: 'City',
    query: query,
    language: 'en',
    unit: 'm',
  },
  location: {
    name: query,
    country: 'United States of America',
    region: 'New York',
    lat: '40.714',
    lon: '-74.006',
    timezone_id: 'America/New_York',
    localtime: new Date().toISOString().replace('T', ' ').slice(0, 16),
    localtime_epoch: Math.floor(Date.now() / 1000),
    utc_offset: '-4.0',
  },
  current: {
    observation_time: new Date().toISOString().slice(11, 16) + ' AM',
    temperature: 22,
    weather_code: 113,
    weather_icons: ['https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
    weather_descriptions: ['Sunny'],
    astro: {
      sunrise: '06:31 AM',
      sunset: '07:45 PM',
      moonrise: '08:15 PM',
      moonset: '05:30 AM',
      moon_phase: 'Waxing Gibbous',
      moon_illumination: 75,
    },
    air_quality: {
      co: '468.05',
      no2: '32.005',
      o3: '55',
      so2: '7.4',
      pm2_5: '6.66',
      pm10: '6.66',
      'us-epa-index': '1',
      'gb-defra-index': '1',
    },
    wind_speed: 12,
    wind_degree: 180,
    wind_dir: 'S',
    pressure: 1015,
    precip: 0,
    humidity: 65,
    cloudcover: 10,
    feelslike: 24,
    uv_index: 6,
    visibility: 16,
  },
});

export const mockForecast = (query: string): ForecastResponse => {
  const forecast: { [date: string]: any } = {};
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    forecast[dateStr] = {
      date: dateStr,
      date_epoch: Math.floor(date.getTime() / 1000),
      astro: {
        sunrise: '06:30 AM',
        sunset: '07:45 PM',
        moonrise: '08:15 PM',
        moonset: '05:30 AM',
        moon_phase: 'Waxing Gibbous',
        moon_illumination: 75,
      },
      mintemp: 18 + Math.floor(Math.random() * 5),
      maxtemp: 25 + Math.floor(Math.random() * 5),
      avgtemp: 22,
      totalsnow: 0,
      sunhour: 10.5,
      uv_index: 6,
      hourly: [],
    };
  }

  return {
    request: {
      type: 'City',
      query: query,
      language: 'en',
      unit: 'm',
    },
    location: {
      name: query,
      country: 'United States of America',
      region: 'New York',
      lat: '40.714',
      lon: '-74.006',
      timezone_id: 'America/New_York',
      localtime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      localtime_epoch: Math.floor(Date.now() / 1000),
      utc_offset: '-4.0',
    },
    current: mockCurrentWeather(query).current,
    forecast,
  };
};

export const mockLocations = (query: string): LocationsResponse => ({
  request: {
    query,
    results: 3,
  },
  results: [
    { id: 1, name: query, country: 'United States of America', region: 'New York', lat: '40.714', lon: '-74.006', url: '' },
    { id: 2, name: `${query} City`, country: 'United States of America', region: 'New York', lat: '40.758', lon: '-73.985', url: '' },
    { id: 3, name: `${query} Metro`, country: 'United States of America', region: 'New York', lat: '40.678', lon: '-73.944', url: '' },
  ],
});
