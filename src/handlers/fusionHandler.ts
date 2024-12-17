import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

export const getFusioned = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const data = {
      name: "Luke Skywalker",
      temperature: "25°C",
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
