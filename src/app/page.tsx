import styles from "./page.module.css";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";

const currentUserDocument = graphql(`
  query currentUser {
    viewer {
      login
    }
  }
`);

export default async function Home() {
  const res = await serverUrqlClient()
    .query(currentUserDocument, {})
    .toPromise();

  return (
    <main className={styles.main}>
      You are {res.data?.viewer?.login}, {res.error?.message}
    </main>
  );
}
