import { FragmentType, graphql, useFragment } from "@/gql";
import { IssueListHeader } from "./IssueListHeader";
import { IssueListItem } from "./IssueListItem";

const fragment = graphql(`
  fragment IssueList_Repository on Repository {
    owner {
      id
      login
    }
    name
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
      {repository.issues.nodes?.length === 0 ? (
        <p>
          No issue found. Please create{" "}
          <a
            href={`https://github.com/${repository.owner.login}/${repository.name}`}
          >
            here
          </a>
        </p>
      ) : (
        <ul>
          {repository.issues.nodes?.map((issue) =>
            issue ? (
              <IssueListItem issue={issue} key={issue.id} />
            ) : (
              <li key="invalid">Invalid item</li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
