import { Issue } from "@/component/Issue";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";

const document = graphql(`
  query issue($id: ID!) {
    node(id: $id) {
      ...Issue_Issue
    }
  }
`);

export default async function IssuePage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await serverUrqlClient()
    .query(document, {
      id: params.id,
    })
    .toPromise();

  if (data?.node == null || data.node.__typename !== "Issue") {
    return <div>Invalid ID</div>;
  }

  return <Issue issue={data.node} />;
}
