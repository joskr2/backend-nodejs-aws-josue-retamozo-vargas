import axios from "axios";

export class WeatherService {
  async getWeather(location: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OpenWeather API key is not defined in environment variables"
      );
    }

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    return {
      temperature: data?.main?.temp,
      weather: data?.weather[0]?.description,
    };
  }
}
