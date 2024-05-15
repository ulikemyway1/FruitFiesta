import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class TokenStorage implements TokenCache {
  storage: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: "",
  };

  constructor() {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const token = JSON.parse(savedToken);
      this.storage = token;
    }
  }

  public get(tokenCacheOptions?: TokenCacheOptions) {
    console.log(tokenCacheOptions);

    console.log("гетаеца", this.storage);

    return this.storage;
  }

  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) {
    console.info(tokenCacheOptions);

    // this.storage.expirationTime = cache.expirationTime;
    // this.storage.token = cache.token;
    // this.storage.refreshToken = cache.refreshToken;
    this.storage = cache;

    localStorage.setItem("token", JSON.stringify(cache));

    console.log("сетаеца", this.storage);
  }

  // public clear(): void {
  //   this.storage = {
  //     token: "",
  //     expirationTime: 0,
  //     refreshToken: "",
  //   };
  // }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
