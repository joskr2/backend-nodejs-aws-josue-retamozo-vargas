import { DynamoDB } from "aws-sdk";

export class HistoryRepository {
  private db: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(db: DynamoDB.DocumentClient) {
    this.db = db;
    this.tableName = process.env.TABLE_NAME!;
  }

  async getHistory(limit: number, lastEvaluatedKey?: string) {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey
        ? JSON.parse(lastEvaluatedKey)
        : undefined,
    };
    const result = await this.db.scan(params).promise();
    return result;
  }
}
