import IWeather from '@/models/Weather';

class WeatherMapper {
  public static toWeather(data: any): IWeather {
    return {
      name: data.name,
      weather: data.weather,
      main: {
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
      },
    };
  }
}

export default WeatherMapper;
