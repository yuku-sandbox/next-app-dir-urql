import { FragmentType, graphql, useFragment } from "@/gql";
import { IssueListHeader } from "./IssueListHeader";
import Link from "next/link";

const fragment = graphql(`
  fragment IssueList_Repository on Repository {
    issues(first: 10) {
      nodes {
        id
        title
        author {
          login
        }
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
        {repository.issues.nodes?.map((issue) => (
          <li>
            <Link href={`/issues/${issue?.id}`}>
              {issue?.title} by {issue?.author?.login}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
