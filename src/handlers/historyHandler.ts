import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient();

export const getHistory: APIGatewayProxyHandler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Table name is not defined in environment variables",
      }),
    };
  }

  const limit = event.queryStringParameters?.limit
    ? parseInt(event.queryStringParameters.limit)
    : 10;
  const lastEvaluatedKey = event.queryStringParameters?.lastEvaluatedKey;

  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
    Limit: limit,
    ExclusiveStartKey: lastEvaluatedKey
      ? JSON.parse(lastEvaluatedKey)
      : undefined,
  };

  try {
    const result = await db.scan(params).promise();
    console.log("History data fetched successfully");
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: result.Items,
        lastEvaluatedKey: result.LastEvaluatedKey
          ? JSON.stringify(result.LastEvaluatedKey)
          : null,
      }),
    };
  } catch (error) {
    console.error("Error fetching history data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch history data" }),
    };
  }
};
