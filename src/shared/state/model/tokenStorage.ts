import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class TokenStorage implements TokenCache {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public get(tokenCacheOptions?: TokenCacheOptions) {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    return token;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) {
    localStorage.setItem("token", JSON.stringify(cache));
  }

  public clear() {
    localStorage.removeItem("token");
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
