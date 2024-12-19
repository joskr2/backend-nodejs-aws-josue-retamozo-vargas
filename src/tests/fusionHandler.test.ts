import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import * as weatherService from "../services/weatherService";
import * as swapiService from "../services/swapiService";
import { getFusioned } from "../controllers/fusionController";

describe("GET /fusionados", () => {
  const mockEvent: Partial<APIGatewayEvent> = {};
  const mockContext: Partial<Context> = {};

  beforeAll(() => {
    (jest.spyOn(weatherService as any, "getWeather") as jest.Mock).mockResolvedValue({
      temperature: 25,
      weather: "clear sky",
    });
    
    (jest.spyOn(swapiService as any, "getPeople") as jest.Mock).mockResolvedValue({
      name: "Luke Skywalker",
      height: "172",
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

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
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest
      .spyOn(weatherService as any, "getWeather")
      .mockRejectedValue(new Error("Error simulado"));

    const result = (await getFusioned(
      mockEvent as APIGatewayEvent,
      mockContext as Context
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe("Error interno del servidor");
  });
});
