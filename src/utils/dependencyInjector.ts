import { DynamoDB } from "aws-sdk";

import { CacheService } from "../services/cacheService";
import { SwapiService } from "../services/swapiService";
import { WeatherService } from "../services/weatherService";
import { FusionRepository } from "../repositories/fusionRepository";
import { HistoryRepository } from "../repositories/historyRepository";
import { StoreRepository } from "../repositories/storeRepository";

const db = new DynamoDB.DocumentClient();

const fusionRepository = new FusionRepository(db);
const historyRepository = new HistoryRepository(db);
const storeRepository = new StoreRepository(db);

const cacheService = new CacheService(db);
const swapiService = new SwapiService();
const weatherService = new WeatherService();

export {
  fusionRepository,
  historyRepository,
  storeRepository,
  cacheService,
  swapiService,
  weatherService,
};
