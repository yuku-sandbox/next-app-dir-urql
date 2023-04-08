import styles from "./page.module.css";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";
import { IssueList } from "@/component/IssueList";
import { UrqlServerProvider } from "@/component/UrqlServerProvider";

const document = graphql(`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      ...IssueList_Repository
    }
  }
`);

export default async function IssueListPage() {
  const { data } = await serverUrqlClient()
    .query(document, {
      owner: process.env.NEXT_PUBLIC_GITHUB_OWNER as string,
      name: process.env.NEXT_PUBLIC_GITHUB_REPO as string,
    })
    .toPromise();

  if (data?.repository == null) {
    throw new Error("");
  }

  return (
    <UrqlServerProvider>
      <main className={styles.main}>
        <IssueList repository={data.repository} />
      </main>
    </UrqlServerProvider>
  );
}
