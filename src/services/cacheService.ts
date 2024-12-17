import { DynamoDB } from "aws-sdk";

export class CacheService {
  private db = new DynamoDB.DocumentClient();

  async getCache(key: string) {
    const result = await this.db
      .get({ TableName: process.env.TABLE_NAME!, Key: { id: key } })
      .promise();
    if (!result.Item) return null;
    const isValid = Date.now() - result.Item.timestamp < 30 * 60 * 1000;
    return isValid ? result.Item.data : null;
  }

  async setCache(key: string, data: any) {
    await this.db
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: { id: key, data, timestamp: Date.now() },
      })
      .promise();
  }
}
