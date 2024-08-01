import Image from "next/image";
import Link from "next/link";
import { Button, Timeline } from "antd";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <Image
          src="/images/me.jpg"
          alt="next-admin"
          width={144}
          height={144}
          style={{ borderRadius: 9999 }}
          priority
        />

        <h1 className={styles.heading2Xl}>Legoshi Liu</h1>

        <section className={styles.headingMd}>
          <p>
            Hello, I'm <strong>Liu</strong>. I'm a front-end engineer . You can
            contact me on <a href="https://github.com/Lookou823">Github</a>.
          </p>
          <p>(This is a sample website - contains the demos of my projects.)</p>
        </section>

        <div className={styles.timeBox}>
          <Timeline
            items={[
              {
                children: "bpmn.js",
              },
              {
                children: "charts",
              },
              {
                children: "virtual list",
              },
              {
                children: "something fun....",
              },
            ]}
          />
        </div>
      </div>
      <Link href="/home" style={{ marginRight: 20 }}>
        <Button type="primary">try it</Button>
      </Link>
    </main>
  );
}
