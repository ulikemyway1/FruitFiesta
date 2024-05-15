import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import ctpClient from "./BuildClientToken";

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: "juice-fruits-shop",
});

export default apiRoot;
