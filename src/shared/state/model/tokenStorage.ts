import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class TokenStorage implements TokenCache {
  // storage: TokenStore = {
  //   token: "",
  //   expirationTime: 0,
  //   refreshToken: undefined,
  // };

  // constructor() {
  //   const authToken = localStorage.getItem("auth-token");
  //   if (authToken) {
  //     const savedTokens = JSON.parse(authToken);
  //     this.storage = savedTokens;
  //   }
  // }

  public get(tokenCacheOptions?: TokenCacheOptions) {
    // if (tokenCacheOptions) {
    //   return this.storage;
    // }
    // return this.storage;

    console.log(tokenCacheOptions);
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    return token;
  }

  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) {
    // this.storage = cache;

    console.log(tokenCacheOptions);
    localStorage.setItem("token", JSON.stringify(cache));
    // if (tokenCacheOptions) {
    //   console.info(`Just get tokenCacheOptions: ${tokenCacheOptions}`);
    // }
  }

  public clear() {
    // this.storage = {
    //   token: "",
    //   expirationTime: 0,
    //   refreshToken: undefined,
    // };

    localStorage.removeItem("token");
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
