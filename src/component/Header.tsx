import { FragmentType, graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment Header_Repository on Repository {
    owner {
      login
    }
    name
  }
`);

export function Header(props: { repository: FragmentType<typeof fragment> }) {
  const repository = useFragment(fragment, props.repository);

  return (
    <h1>
      {repository.owner.login}/{repository.name}'s issues
    </h1>
  );
}
