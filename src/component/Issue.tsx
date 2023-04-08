import { FragmentType, graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment Issue_Issue on Issue {
    id
    title
    author {
      login
    }
    body
  }
`);

export function Issue(props: { issue: FragmentType<typeof fragment> }) {
  const issue = useFragment(fragment, props.issue);

  return (
    <div>
      <h1>
        {issue.title} by {issue.author?.login || "unknown"}
      </h1>
      <div>{issue.body}</div>
    </div>
  );
}
