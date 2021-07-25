// Interfaz y modelo de tiempo

interface Weather {
  main: string;
  description: string;
}

interface Main {
  temp: number;
  tempMin: number;
  tempMax: number;
}

interface IWeather {
  name: string;
  weather: Weather[];
  main: Main;
}
export default IWeather;
