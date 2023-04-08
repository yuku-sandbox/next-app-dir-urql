import { UrqlClientProvider } from "./UrqlClientProvider";
import { serverSsrExchange } from "@/lib/urql";

export function UrqlServerProvider(props: { children: React.ReactNode }) {
  const ssrData = serverSsrExchange().extractData();

  return (
    <UrqlClientProvider ssrData={ssrData}>{props.children}</UrqlClientProvider>
  );
}
