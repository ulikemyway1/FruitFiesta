import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class TokenStorage implements TokenCache {
  storage: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: undefined,
  };

  constructor() {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const savedTokens = JSON.parse(authToken);
      this.storage = savedTokens;
    }
  }

  public get(tokenCacheOptions?: TokenCacheOptions) {
    if (tokenCacheOptions) {
      return this.storage
    }
    return this.storage;
  }

  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) {
    this.storage.expirationTime = cache.expirationTime;
    this.storage.token = cache.token;
    this.storage.refreshToken = cache.refreshToken;

    localStorage.setItem("token", JSON.stringify(cache));
    if (tokenCacheOptions) {
      console.info(`Just get tokenCacheOptions: ${tokenCacheOptions}`)
    }
  }

  public clear(): void {
    this.storage = {
      token: "",
      expirationTime: 0,
      refreshToken: undefined,
    }
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
