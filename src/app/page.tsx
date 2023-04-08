import { Header } from "@/component/Header";
import styles from "./page.module.css";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";

const document = graphql(`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...Header_Repository
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
    </main>
  );
}
