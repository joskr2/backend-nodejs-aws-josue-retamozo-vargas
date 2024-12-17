import axios from "axios";

export class WeatherService {
  static async getWeather(location: string) {
    const apiKey = "d29c45885ac14356e4df5717360c7d3f";// demo key from openweathermap
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    return {
      temperature: data.main.temp,
      weather: data.weather[0].description,
    };
  }
}
