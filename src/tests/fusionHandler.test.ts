import { getFusioned } from "../handlers/fusionHandler";
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

describe("GET /fusionados", () => {
  const mockEvent: Partial<APIGatewayEvent> = {};
  const mockContext: Partial<Context> = {};

  test("Debe retornar statusCode 200 y datos válidos", async () => {
    const result = (await getFusioned(
      mockEvent as APIGatewayEvent,
      mockContext as Context
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);

    expect(body).toHaveProperty("name", "Luke Skywalker");
    expect(body).toHaveProperty("temperature", "25°C");
  });

  test("Debe manejar errores correctamente", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {
      throw new Error("Simulated error");
    });

    const result = (await getFusioned(
      mockEvent as APIGatewayEvent,
      mockContext as Context
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Error interno del servidor");
  });
});
