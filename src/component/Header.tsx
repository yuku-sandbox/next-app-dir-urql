import { FragmentType, graphql, useFragment } from "@/gql";

const userDocument = graphql(`
  fragment Header_User on User {
    login
  }
`);

export function Header(props: { user: FragmentType<typeof userDocument> }) {
  const currentUser = useFragment(userDocument, props.user);

  return <h1>Hello, {currentUser.login}</h1>;
}
