import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import secrets from '../secrets';

const projectKey = secrets.CTP_PROJECT_KEY;
const scopes = [secrets.CTP_SCOPES];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.eu-central-1.aws.commercetools.com',
  projectKey,
  credentials: {
    clientId: secrets.CTP_CLIENT_ID,
    clientSecret: secrets.CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${secrets.CTP_HOST}.commercetools.com`,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
export default ctpClient;
