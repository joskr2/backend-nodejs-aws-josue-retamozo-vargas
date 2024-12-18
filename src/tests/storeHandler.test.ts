import { postData } from "../handlers/storeHandler";
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

jest.mock("aws-sdk");

const mockPut = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValue({}),
});

DynamoDB.DocumentClient.prototype.put = mockPut;

describe("POST /almacenar", () => {
  const mockEvent: Partial<APIGatewayEvent> = {
    body: JSON.stringify({ id: "1", data: "test data" }),
  };
  const mockContext: Partial<Context> = {};

  beforeAll(() => {
    process.env.TABLE_NAME = "FusionedData";
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Debe retornar statusCode 200 y almacenar datos válidos", async () => {
    const result = (await postData(
      mockEvent as APIGatewayEvent,
      mockContext as Context,
      () => {}
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Data stored successfully");
    expect(body.item).toHaveProperty("id", "1");
    expect(body.item).toHaveProperty("data", "test data");
  });

  test("Debe manejar errores correctamente", async () => {
    mockPut.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValue(new Error("Simulated error")),
    });

    const result = (await postData(
      mockEvent as APIGatewayEvent,
      mockContext as Context,
      () => {}
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Failed to store data");
  });
});
