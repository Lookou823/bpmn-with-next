/* eslint-disable react/no-unescaped-entities */
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
          className={styles.borderCircle}
          priority
        />

        <h1 className={styles.heading2Xl}>Legoshi Liu</h1>

        <section className={styles.headingMd}>
          <p>
            Hello, I'm <strong>Liu</strong>. I'm a front-end engineer . You can
            contact me on{" "}
            <Button style={{ padding: 0, fontSize: `1.2rem` }} type="link">
              <a href="https://github.com/Lookou823">Github</a>
            </Button>
            .
          </p>
          <p>(This is a sample website - contains the demos of my projects.)</p>
        </section>

        <div className={styles.timeBox}>
          <Timeline
            style={{ width: "100%", marginTop: 20 }}
            items={[
              {
                children: "bpmn.js",
              },
              {
                children: "charts",
              },
              {
                children: "UI components based on Bit.Dev",
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
        <Link href="/bpm" style={{ marginRight: 20 }}>
          <Button type="primary">Try it</Button>
        </Link>
      </div>
    </main>
  );
}
