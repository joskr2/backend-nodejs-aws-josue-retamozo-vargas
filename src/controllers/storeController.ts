import { APIGatewayProxyHandler } from "aws-lambda";
import { storeRepository } from "../utils/dependencyInjector";
import { successResponse, errorResponse } from "../utils/response";

export const postData: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { id, data } = body;

  if (!id || !data) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid request, 'id' and 'data' are required",
      }),
    };
  }

  const item = {
    id,
    data,
    timestamp: Date.now(),
  };

  try {
    await storeRepository.saveData(item);
    return successResponse({ message: "Data stored successfully", item });
  } catch (error) {
    console.error("Error storing data:", error);
    return errorResponse("Failed to store data");
  }
};
