export default class Router {
  routes: Array<{ pattern: string | RegExp; handler: (hash: string) => void }>;

  onNavigate?: (hash: string) => void;

  fallback?: (hash: string) => void;

  constructor() {
    this.routes = [];

    window.addEventListener("hashchange", () => {
      this.navigate(window.location.hash);
    });
  }

  navigate(hash: string) {
    if (window.location.hash !== hash) {
      // do we need to skip the next event?
      window.location.hash = hash;
    }

    // every time onNavigate we can callback if it exists
    if (this.onNavigate) {
      this.onNavigate(hash);
    }

    for (let i = 0; i < this.routes.length; i += 1) {
      // string
      if (
        typeof this.routes[i].pattern === "string" &&
        this.routes[i].pattern === hash
      ) {
        this.routes[i].handler(hash);
        return;
      }
      // RegExp
      if (hash.match(this.routes[i].pattern)) {
        this.routes[i].handler(hash);
        return;
      }
    }

    // we here if no route matched and we can do something if we have a fallback
    if (this.fallback) {
      this.fallback(hash);
    }
  }

  route(pattern: string | RegExp, handler: (hash: string) => void) {
    this.routes.push({ pattern, handler });
  }
}
