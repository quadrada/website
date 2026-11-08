import Image from "next/image";

import badge from "@/assets/brand/quadrada-badge.png";
import { SocialLinks } from "@/components/social-links/SocialLinks";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

const DECOR_SQUARE_COUNT = 8;

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <div className={styles.decor} aria-hidden="true">
        {Array.from({ length: DECOR_SQUARE_COUNT }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <Image
          className={styles.badge}
          src={badge}
          alt={`Emblema d'${siteConfig.name}`}
          sizes="(min-width: 640px) 12rem, 9rem"
          preload
        />
        <h1 className={styles.title}>
          A <span className={styles.titleAccent}>Quadrada</span>
        </h1>
        <p className={styles.subtitle}>{siteConfig.fullName}</p>
        <SocialLinks />
      </div>
    </main>
  );
}
