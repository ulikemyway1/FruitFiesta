import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class TokenStorage implements TokenCache {
  public get(tokenCacheOptions?: TokenCacheOptions) {
    console.log(tokenCacheOptions);
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    return token;
  }

  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) {
    console.log(tokenCacheOptions);
    localStorage.setItem("token", JSON.stringify(cache));
  }

  public clear() {
    localStorage.removeItem("token");
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
