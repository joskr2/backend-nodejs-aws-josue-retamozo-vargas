import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import {
  swapiService,
  weatherService,
} from "../utils/dependencyInjector";
import { successResponse, errorResponse } from "../utils/response";

export const getFusioned = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const weatherData = await weatherService.getWeather("Arequipa");
    const peopleData = await swapiService.getPeople();

    const weatherDataToCelcius = weatherData?.temperature - 273.15;
    const data = {
      name: peopleData.name,
      temperature: `${weatherDataToCelcius.toFixed(2) || 0}°C`,
    };

    return successResponse(data);
  } catch (error) {
    console.error("Error al obtener datos fusionados", error);
    return errorResponse("Error interno del servidor");
  }
};
