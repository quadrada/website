import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

import styles from "./SocialLinks.module.css";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
    tone: styles.instagram,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
    tone: styles.facebook,
  },
];

export function SocialLinks() {
  return (
    <section className={styles.section} aria-labelledby="social-heading">
      <h2 id="social-heading" className="visually-hidden">
        Redes sociais
      </h2>
      <ul className={styles.grid} role="list">
        {SOCIAL_LINKS.map(({ label, href, Icon, tone }) => (
          <li key={label}>
            <a
              className={`${styles.tile} ${tone}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className={styles.icon} />
              <span className={styles.label}>{label}</span>
              <span className="visually-hidden">(abre numa nova janela)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
