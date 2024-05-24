import {
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import tokenStorage from "../state/model/tokenStorage";

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
}

const requestAPIConfig: IRequestAPIConfig = {
  httpMiddlewareOptions: {
    host: process.env.CTP_API_URL,
    fetch,
  },
  anonymousMiddlewareOptions: {
    host: process.env.CTP_AUTH_URL,
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    scopes: process.env.CTP_SCOPES.split(" "),
    tokenCache: tokenStorage,
    fetch,
  },
  passwordAuthMiddlewareOptions: {
    host: process.env.CTP_AUTH_URL,
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
      user: {
        username: "username",
        password: "password",
      },
    },
    tokenCache: tokenStorage,
    fetch,
  },
  refreshMiddlewareOptions: {
    host: process.env.CTP_AUTH_URL,
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    tokenCache: tokenStorage,
    refreshToken: "refreshToken",
    fetch,
  },
};

interface IRequestAPIConfig {
  httpMiddlewareOptions: HttpMiddlewareOptions;
  anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions;
  passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions;
  refreshMiddlewareOptions: RefreshAuthMiddlewareOptions;
}
export default requestAPIConfig;
