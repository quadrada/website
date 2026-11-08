import Image from "next/image";
import Link from "next/link";

import shield from "@/assets/brand/quadrada-shield.png";

import { LockIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/" aria-label={`${siteConfig.name} — página inicial`}>
          <Image className={styles.brandMark} src={shield} alt="" height={36} />
          <span className={styles.brandName}>{siteConfig.name}</span>
        </Link>

        {/* Disabled until member login ships (phase 2); a dead link would lead nowhere. */}
        <div className={styles.memberAccess}>
          <button
            className={styles.memberButton}
            type="button"
            disabled
            aria-describedby="member-note"
          >
            <LockIcon />
            Área de Sócio
          </button>
          <span className={styles.memberNote} id="member-note">
            Brevemente disponível para sócios
          </span>
        </div>
      </div>
    </header>
  );
}
