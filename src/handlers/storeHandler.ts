import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient();

export const postData: APIGatewayProxyHandler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Table name is not defined in environment variables",
      }),
    };
  }

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
    await db
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data stored successfully", item }),
    };
  } catch (error) {
    console.error("Error storing data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to store data" }),
    };
  }
};
