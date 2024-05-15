import fetch from "node-fetch";
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import tokenStorage from "./tokenStorage";

if (!process.env.CTP_PROJECT_KEY) {
  throw new Error("CTP_PROJECT_KEY is not set");
} else if (!process.env.CTP_CLIENT_SECRET) {
  throw new Error("CTP_CLIENT_SECRET is not set");
} else if (!process.env.CTP_CLIENT_ID) {
  throw new Error("CTP_CLIENT_ID is not set");
} else if (!process.env.CTP_AUTH_URL) {
  throw new Error("CTP_AUTH_URL is not set");
} else if (!process.env.CTP_API_URL) {
  throw new Error("CTP_API_URL is not set");
} else if (!process.env.CTP_SCOPES) {
  throw new Error("CTP_SCOPES is not set");
} else if (!process.env.CTP_HOST) {
  throw new Error("CTP_HOST is not set");
}

const projectKey = process.env.CTP_PROJECT_KEY;
const scopes = [process.env.CTP_SCOPES];

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: "https://auth.eu-central-1.aws.commercetools.com",
  projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
    user: {
      username: "qwerty12345678@qwerty.com",
      password: "Qwerty1!",
    },
  },
  tokenCache: tokenStorage,
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${process.env.CTP_HOST}.commercetools.com`,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
