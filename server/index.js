const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Weatherstack API configuration
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const WEATHERSTACK_BASE_URL = 'https://api.weatherstack.com';

if (!WEATHERSTACK_API_KEY) {
  console.error('ERROR: WEATHERSTACK_API_KEY is not set in environment variables');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Proxy endpoint for current weather
app.get('/api/current', async (req, res) => {
  try {
    const { query, units, language } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 601, type: 'missing_query', info: 'Query parameter is required' }
      });
    }

    const response = await axios.get(`${WEATHERSTACK_BASE_URL}/current`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query,
        units: units || 'm',
        language: language || 'en'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Current weather error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({
      success: false,
      error: { 
        code: 615, 
        type: 'request_failed', 
        info: error.response?.data?.error?.info || 'Failed to fetch current weather data' 
      }
    });
  }
});

// Proxy endpoint for forecast
app.get('/api/forecast', async (req, res) => {
  try {
    const { query, forecast_days, units, language } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 601, type: 'missing_query', info: 'Query parameter is required' }
      });
    }

    const response = await axios.get(`${WEATHERSTACK_BASE_URL}/forecast`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query,
        forecast_days: forecast_days || 7,
        units: units || 'm',
        language: language || 'en'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({
      success: false,
      error: { code: 615, type: 'request_failed', info: 'Failed to fetch forecast data' }
    });
  }
});

// Proxy endpoint for historical weather
app.get('/api/historical', async (req, res) => {
  try {
    const { query, historical_date, units, language } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 601, type: 'missing_query', info: 'Query parameter is required' }
      });
    }

    if (!historical_date) {
      return res.status(400).json({
        success: false,
        error: { code: 614, type: 'missing_historical_date', info: 'Historical date parameter is required' }
      });
    }

    const response = await axios.get(`${WEATHERSTACK_BASE_URL}/historical`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query,
        historical_date,
        units: units || 'm',
        language: language || 'en'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Historical weather error:', error.message);
    res.status(500).json({
      success: false,
      error: { code: 615, type: 'request_failed', info: 'Failed to fetch historical weather data' }
    });
  }
});

// Proxy endpoint for marine weather
app.get('/api/marine', async (req, res) => {
  try {
    const { lat, lon, units, language } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: { 
          code: 616, 
          type: 'missing_coordinates', 
          info: 'Latitude and longitude parameters are required' 
        }
      });
    }

    const response = await axios.get(`${WEATHERSTACK_BASE_URL}/marine`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: `${lat},${lon}`,
        units: units || 'm',
        language: language || 'en'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Marine weather error:', error.message);
    res.status(500).json({
      success: false,
      error: { code: 615, type: 'request_failed', info: 'Failed to fetch marine weather data' }
    });
  }
});

// Proxy endpoint for location search
app.get('/api/locations', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 601, type: 'missing_query', info: 'Query parameter is required' }
      });
    }

    const response = await axios.get(`${WEATHERSTACK_BASE_URL}/autocomplete`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Location search error:', error.message);
    res.status(500).json({
      success: false,
      error: { code: 615, type: 'request_failed', info: 'Failed to fetch location data' }
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: { code: 500, type: 'server_error', info: 'Internal server error' }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Weatherstack Proxy Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
