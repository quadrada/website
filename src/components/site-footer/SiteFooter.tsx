import { cacheLife } from "next/cache";

import { siteConfig } from "@/config/site";

import styles from "./SiteFooter.module.css";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>
          &copy; <CurrentYear /> {siteConfig.legalName}
        </p>
      </div>
    </footer>
  );
}
