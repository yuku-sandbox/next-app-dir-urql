"use client";

import { FragmentType, graphql, useFragment } from "@/gql";
import Link from "next/link";
import { useMutation } from "urql";

const fragment = graphql(`
  fragment IssueListItem_Issue on Issue {
    id
    title
    author {
      id: login
      login
    }
  }
`);

const renameIssueDoc = graphql(`
  mutation renameIssue($id: ID!, $title: String!) {
    updateIssue(input: { id: $id, title: $title }) {
      issue {
        ...IssueListItem_Issue
      }
    }
  }
`);

export function IssueListItem(props: { issue: FragmentType<typeof fragment> }) {
  const issue = useFragment(fragment, props.issue);
  const [, renameIssue] = useMutation(renameIssueDoc);

  const onClickRename = async () => {
    const newTitle = prompt("New title", issue.title);
    if (newTitle) {
      await renameIssue({
        id: issue.id,
        title: newTitle,
      });
    }
  };

  return (
    <li>
      {issue?.title} by {issue?.author?.login}
      <Link href={`/issues/${issue?.id}`}>Detail</Link>/
      <button onClick={onClickRename}>Rename</button>
    </li>
  );
}
