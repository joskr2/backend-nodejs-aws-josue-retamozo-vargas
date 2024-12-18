import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { getWeather } from "../services/weatherService";
import { getPeople } from "../services/swapiService";

export const getFusioned = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const weatherData = await getWeather("Arequipa");
    const peopleData = await getPeople();

    const data = {
      name: peopleData.name,
      temperature: `${weatherData.temperature}°C`,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error al obtener datos fusionados", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};

module.exports = { getFusioned };
