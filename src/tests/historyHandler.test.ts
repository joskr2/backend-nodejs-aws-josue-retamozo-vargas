import { getHistory } from "../controllers/historyController";
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

jest.mock("aws-sdk");

const mockScan = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValue({
    Items: [{ id: "1", data: "test data", timestamp: Date.now() }],
    LastEvaluatedKey: null,
  }),
});

DynamoDB.DocumentClient.prototype.scan = mockScan;

describe("GET /historial", () => {
  const mockEvent: Partial<APIGatewayEvent> = {
    queryStringParameters: { limit: "10" },
  };
  const mockContext: Partial<Context> = {};

  beforeAll(() => {
    process.env.TABLE_NAME = "FusionedData";
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Debe retornar statusCode 200 y datos válidos", async () => {
    const result = (await getHistory(
      mockEvent as APIGatewayEvent,
      mockContext as Context,
      () => {}
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.items).toHaveLength(1);
    expect(body.items[0]).toHaveProperty("id", "1");
    expect(body.items[0]).toHaveProperty("data", "test data");
  });

  test("Debe manejar errores correctamente", async () => {
    mockScan.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValue(new Error("Simulated error")),
    });

    const result = (await getHistory(
      mockEvent as APIGatewayEvent,
      mockContext as Context,
      () => {}
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Failed to fetch history data");
  });
});
