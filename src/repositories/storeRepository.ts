import { DynamoDB } from "aws-sdk";

export class StoreRepository {
  private db: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(db: DynamoDB.DocumentClient) {
    this.db = db;
    this.tableName = process.env.TABLE_NAME!;
  }

  async saveData(item: any) {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    await this.db.put(params).promise();
  }
}
