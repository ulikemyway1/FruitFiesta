import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import ctpClient from "./BuildClient";

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: "juice-fruits-shop",
});

export default apiRoot;
