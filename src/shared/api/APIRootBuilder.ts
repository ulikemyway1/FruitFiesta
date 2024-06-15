import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import requestAPIConfig from "./APIRootBuilderConfig";
import tokenStorage from "../state/model/tokenStorage";

export class APIRootBuilder {
  private savedRefresh: string = "";

  private client = new ClientBuilder()
    .withHttpMiddleware(requestAPIConfig.httpMiddlewareOptions)
    .withProjectKey(process.env.CTP_PROJECT_KEY!);

  private createRequestAPI(client: ClientBuilder) {
    tokenStorage.clear();
    return createApiBuilderFromCtpClient(client.build()).withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY!,
    });
  }

  public withAnonymousSessionFlow() {
    return this.createRequestAPI(
      this.client.withAnonymousSessionFlow(
        requestAPIConfig.anonymousMiddlewareOptions,
      ),
    );
  }

  public withPasswordFlow(password: string, login: string) {
    requestAPIConfig.passwordAuthMiddlewareOptions.credentials.user.password =
      password;
    requestAPIConfig.passwordAuthMiddlewareOptions.credentials.user.username =
      login;
    return this.createRequestAPI(
      this.client.withPasswordFlow(
        requestAPIConfig.passwordAuthMiddlewareOptions,
      ),
    );
  }

  public withRefreshTokenFlow() {
    requestAPIConfig.refreshMiddlewareOptions.refreshToken = this.savedRefresh;
    return this.createRequestAPI(
      this.client.withRefreshTokenFlow(
        requestAPIConfig.refreshMiddlewareOptions,
      ),
    );
  }

  public apiRoot() {
    const savedAuthToken =
      localStorage.getItem("auth-token") || localStorage.getItem("token");
    if (this.savedRefresh) {
      return this.withRefreshTokenFlow();
    }
    if (savedAuthToken) {
      const savedLocalRefresh = JSON.parse(savedAuthToken).refreshToken;
      if (savedLocalRefresh) {
        this.savedRefresh = JSON.parse(savedAuthToken).refreshToken;
        return this.withRefreshTokenFlow();
      }
    }
    return this.withAnonymousSessionFlow();
  }
}

const requestAPI = new APIRootBuilder();
export default requestAPI;
