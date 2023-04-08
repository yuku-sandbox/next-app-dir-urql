import { FragmentType, graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment IssueListHeader_Repository on Repository {
    owner {
      login
    }
    name
  }
`);

export function IssueListHeader(props: {
  repository: FragmentType<typeof fragment>;
}) {
  const repository = useFragment(fragment, props.repository);

  return (
    <h1>
      {repository.owner.login}/{repository.name}'s issues
    </h1>
  );
}
