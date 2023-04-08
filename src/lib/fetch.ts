type Fetch = typeof globalThis.fetch & {
  _noStore?: boolean;
  __nextPatched?: boolean;
};

if (typeof window === "undefined") {
  const originalFetch = globalThis.fetch as Fetch;

  if (originalFetch.__nextPatched && !originalFetch._noStore) {
    globalThis.fetch = async (input, init) => {
      return await originalFetch(input, {
        ...init,
        cache: "no-store",
      });
    };
    (fetch as Fetch)._noStore = true;
    (fetch as Fetch).__nextPatched = true;
  }
}
