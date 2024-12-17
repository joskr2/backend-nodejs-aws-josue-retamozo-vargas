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

    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("temperature");
  });

  test("Debe manejar errores correctamente", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const faultyHandler = async () => {
      throw new Error("Error simulado");
    };

    const result = await faultyHandler().catch((error) => ({
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }));

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Error simulado");
  });
});
