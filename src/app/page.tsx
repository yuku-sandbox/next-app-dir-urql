import { Header } from "@/component/Header";
import styles from "./page.module.css";
import { graphql } from "@/gql";
import { serverUrqlClient } from "@/lib/urql";

const document = graphql(`
  query currentUser {
    viewer {
      ...Header_User
    }
  }
`);

export default async function Home() {
  const { data } = await serverUrqlClient().query(document, {}).toPromise();

  if (data == null) {
    throw new Error("");
  }

  return (
    <main className={styles.main}>
      <Header user={data.viewer} />
    </main>
  );
}
