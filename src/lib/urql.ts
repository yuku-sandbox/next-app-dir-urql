import { cache } from "react";
import {
  fetchExchange,
  ssrExchange,
  cacheExchange,
  SSRExchange,
  SSRData,
  Client,
} from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";

export const serverSsrExchange = cache(() => {
  return ssrExchange({ isClient: false });
});

export const serverUrqlClient = cache(() => {
  return createUrqlClient(serverSsrExchange());
});

export function clientUrqlClient(initialState: SSRData) {
  console.log("create UrqlClient with initialState: ", initialState);
  return createUrqlClient(ssrExchange({ isClient: true, initialState }));
}

export function createUrqlClient(ssrCache: SSRExchange) {
  return new Client({
    url: "https://api.github.com/graphql",
    exchanges: [devtoolsExchange, cacheExchange, ssrCache, fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      };
    },
  });
}
