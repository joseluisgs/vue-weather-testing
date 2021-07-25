// Cliente de la Api Rest
import axios from 'axios';
import IWeather from '@/models/Weather';
import WeatherMapper from '@/transformers/weatherMapper';

const openWeatherApiKey = 'b3435b6ecd502d0fbf9605a5f8b3343d';

export default {
  /**
   * Obtiene la información de una ciudad
   */
  async getInfo(city: string): Promise<IWeather> {
    const lang = 'en';
    const units = 'metric';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}
        &units=${units}&lang=${lang}&APPID=${openWeatherApiKey}`;
    const response = await axios.get(url);
    return WeatherMapper.toWeather(response.data);
  },

  /**
   * Devuleve si existe la API Key
   */
  getKey(): boolean {
    return !!openWeatherApiKey;
  },
};
