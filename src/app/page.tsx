import { Header } from "@/component/Header";
import styles from "./page.module.css";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";
import { IssueList } from "@/component/IssueList";

const document = graphql(`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...Header_Repository
      issues {
        ...IssueList_IssueConnection
      }
    }
  }
`);

export default async function Home() {
  const { data } = await serverUrqlClient()
    .query(document, {
      owner: "yukukotani",
      name: "next-app-dir-urql",
    })
    .toPromise();

  if (data?.repository == null) {
    throw new Error("");
  }

  return (
    <main className={styles.main}>
      <Header repository={data.repository} />
      <IssueList issues={data.repository.issues} />
    </main>
  );
}
