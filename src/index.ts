import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { getFusioned } from "./handlers/fusionHandler";
import { successResponse } from "./utils/response";


export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Evento recibido:", event);


  if (event.path === "/") {
    return successResponse({
      message: "¡Bienvenido a la API Backend Node.js en AWS Lambda!",
    });
  }


  if (event.path === "/fusionados") {
    return await getFusioned(event, context);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Ruta no encontrada" }),
  };
};
