import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "backend-nodejs-aws",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "us-east-1",
    environment: {
      CACHE_TTL: "1800",
      TABLE_NAME: "FusionedData",
    },
  },
  functions: {
    fusion: {
      handler: "src/handlers/fusionHandler.getFusioned",
      events: [{ http: { path: "fusionados", method: "get" } }],
    },
    store: {
      handler: "src/handlers/storeHandler.postData",
      events: [{ http: { path: "almacenar", method: "post" } }],
    },
    history: {
      handler: "src/handlers/historyHandler.getHistory",
      events: [{ http: { path: "historial", method: "get" } }],
    },
  },
  resources: {
    Resources: {
      FusionedDataTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "FusionedData",
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
