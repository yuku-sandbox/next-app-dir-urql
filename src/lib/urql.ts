import { cache } from "react";
import {
  cacheExchange,
  fetchExchange,
  ssrExchange,
  createClient,
  SSRExchange,
  SSRData,
} from "@urql/core";

export const serverSsrExchange = cache(() => {
  return ssrExchange({ isClient: false });
});

export const serverUrqlClient = cache(() => {
  return createUrqlClient(serverSsrExchange());
});

export function clientUrqlClient(initialState: SSRData) {
  return createUrqlClient(ssrExchange({ isClient: true, initialState }));
}

export function createUrqlClient(ssrCache: SSRExchange) {
  return createClient({
    url: "https://api.github.com/graphql",
    exchanges: [ssrCache, cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      };
    },
  });
}
