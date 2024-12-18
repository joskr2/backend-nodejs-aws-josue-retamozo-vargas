import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient();

const getCache = async (key: string) => {
  try {
    const result = await db
      .get({ TableName: process.env.TABLE_NAME!, Key: { id: key } })
      .promise();
    if (!result.Item) return null;
    const isValid = Date.now() - result.Item.timestamp < 30 * 60 * 1000;
    return isValid ? result.Item.data : null;
  } catch (error) {
    console.error("Error fetching cache data:", error);
    throw new Error("Failed to fetch cache data");
  }
};

const setCache = async (key: string, data: any) => {
  try {
    await db
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: { id: key, data, timestamp: Date.now() },
      })
      .promise();
  } catch (error) {
    console.error("Error setting cache data:", error);
    throw new Error("Failed to set cache data");
  }
};

export { getCache, setCache };
