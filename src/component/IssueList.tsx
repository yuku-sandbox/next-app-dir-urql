import { FragmentType, graphql, useFragment } from "@/gql";
import { IssueListHeader } from "./IssueListHeader";
import { IssueListItem } from "./IssueListItem";

const fragment = graphql(`
  fragment IssueList_Repository on Repository {
    issues(first: 10) {
      nodes {
        id
        ...IssueListItem_Issue
      }
    }
    ...IssueListHeader_Repository
  }
`);

export function IssueList(props: {
  repository: FragmentType<typeof fragment>;
}) {
  const repository = useFragment(fragment, props.repository);

  return (
    <div>
      <IssueListHeader repository={repository} />
      <ul>
        {repository.issues.nodes?.map((issue) =>
          issue ? (
            <IssueListItem issue={issue} key={issue.id} />
          ) : (
            <li key="invalid">Invalid item</li>
          )
        )}
      </ul>
    </div>
  );
}
