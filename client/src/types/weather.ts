export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

export interface AirQuality {
  co: string;
  no2: string;
  o3: string;
  so2: string;
  pm2_5: string;
  pm10: string;
  'us-epa-index': string;
  'gb-defra-index': string;
}

export interface CurrentWeather {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  astro: Astro;
  air_quality: AirQuality;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  astro: Astro;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  precip: number;
  humidity: number;
  visibility: number;
  pressure: number;
  cloudcover: number;
  heatindex: number;
  dewpoint: number;
  windchill: number;
  windgust: number;
  feelslike: number;
  chanceofrain: number;
  chanceofremdry: number;
  chanceofwindy: number;
  chanceofovercast: number;
  chanceofsunshine: number;
  chanceoffrost: number;
  chanceofhightemp: number;
  chanceoffog: number;
  chanceofsnow: number;
  chanceofthunder: number;
  uv_index: number;
}

export interface HistoricalData {
  date: string;
  date_epoch: number;
  astro: Astro;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyForecast[];
}

export interface MarineData {
  water_temperature: number;
  wave_height: number;
  wave_direction: string;
  wave_period: number;
  swell_height: number;
  swell_direction: string;
  swell_period: number;
  visibility: number;
  water_depth: number;
}

export interface LocationResult {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  url: string;
}

export interface CurrentWeatherResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: Location;
  current: CurrentWeather;
}

export interface ForecastResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: Location;
  current: CurrentWeather;
  forecast: {
    [date: string]: ForecastDay;
  };
}

export interface HistoricalResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: Location;
  historical: {
    [date: string]: HistoricalData;
  };
}

export interface MarineResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: Location;
  marine: MarineData;
}

export interface LocationsResponse {
  request: {
    query: string;
    results: number;
  };
  results: LocationResult[];
}

export interface ApiError {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}

export type Units = 'm' | 's' | 'f';

export interface SearchFilters {
  query: string;
  units: Units;
  language?: string;
}
