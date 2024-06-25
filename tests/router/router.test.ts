import Router from "../../src/app/routing/model/router";

import notFoundPageView from "../../src/pages/notFound";

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    jest.clearAllMocks();
    router = new Router();
    router.run();
  });

  it("should add routes correctly", () => {
    const handler = jest.fn();
    router.route("/test", handler);
    expect(router.routes).toContainEqual({ pattern: "/test", handler });
  });

  it("should navigate to the correct route", () => {
    const handler = jest.fn();
    router.route("/test", handler);
    router.navigate("/test");
    expect(handler).toHaveBeenCalledWith("/test");
  });

  // it("should display notFoundPageView for an unknown route", () => {
  //   Router.switchContent = jest.fn();
  //   router.navigate("/unknown");
  //   expect(Router.switchContent).toHaveBeenCalledWith(notFoundPageView);
  // });

  it("should call fallback for an unknown route if defined", () => {
    const fallback = jest.fn();
    router.fallback = fallback;
    router.navigate("/unknown");
    expect(fallback).toHaveBeenCalledWith("/unknown");
  });
});
