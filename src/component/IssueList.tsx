import { FragmentType, graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment IssueList_IssueConnection on IssueConnection {
    nodes {
      id
      title
      author {
        login
      }
    }
  }
`);

export function IssueList(props: { issues: FragmentType<typeof fragment> }) {
  const issues = useFragment(fragment, props.issues);

  return (
    <ul>
      {issues.nodes?.map((issue) => (
        <li>
          {issue?.title} by {issue?.author?.login}
        </li>
      ))}
    </ul>
  );
}
