import { DynamoDB } from "aws-sdk";

export class FusionRepository {
  private db: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(db: DynamoDB.DocumentClient) {
    this.db = db;
    this.tableName = process.env.TABLE_NAME!;
  }

  async getFusionData(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await this.db.get(params).promise();
    return result.Item;
  }

  async saveFusionData(item: any) {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    await this.db.put(params).promise();
  }
}
