import { cache } from "react";
import {
  SSRExchangeParams,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  createClient,
} from "@urql/core";

export const serverUrqlClient = cache(() => {
  return createUrqlClient({ isClient: false });
});

export function createUrqlClient(ssrParams: SSRExchangeParams) {
  return createClient({
    url: "https://api.github.com/graphql",
    exchanges: [cacheExchange, fetchExchange, ssrExchange(ssrParams)],
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      };
    },
  });
}
