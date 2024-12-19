import { DynamoDB } from "aws-sdk";

export class CacheService {
  private db: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(db: DynamoDB.DocumentClient) {
    this.db = db;
    this.tableName = process.env.TABLE_NAME!;
  }

  async getCache(key: string) {
    const result = await this.db
      .get({ TableName: this.tableName, Key: { id: key } })
      .promise();
    if (!result.Item) return null;
    const isValid = Date.now() - result.Item.timestamp < 30 * 60 * 1000;
    return isValid ? result.Item.data : null;
  }

  async setCache(key: string, data: any) {
    await this.db
      .put({
        TableName: this.tableName,
        Item: { id: key, data, timestamp: Date.now() },
      })
      .promise();
  }
}
