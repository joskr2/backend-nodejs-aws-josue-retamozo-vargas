import axios from "axios";

const getWeather = async (location: string) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OpenWeather API key is not defined in environment variables"
    );
  }

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    return {
      temperature: data?.main?.temp,
      weather: data?.weather[0]?.description,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export { getWeather };
