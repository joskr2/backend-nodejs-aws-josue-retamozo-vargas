import { APIGatewayProxyHandler } from "aws-lambda";
import { historyRepository } from "../utils/dependencyInjector";
import { successResponse, errorResponse } from "../utils/response";

export const getHistory: APIGatewayProxyHandler = async (event) => {
  const limit = event.queryStringParameters?.limit
    ? parseInt(event.queryStringParameters.limit)
    : 10;
  const lastEvaluatedKey = event.queryStringParameters?.lastEvaluatedKey;

  try {
    const result = await historyRepository.getHistory(limit, lastEvaluatedKey);
    return successResponse({
      items: result.Items,
      lastEvaluatedKey: result.LastEvaluatedKey
        ? JSON.stringify(result.LastEvaluatedKey)
        : null,
    });
  } catch (error) {
    console.error("Error fetching history data:", error);
    return errorResponse("Failed to fetch history data");
  }
};
