import Link from "next/link";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.lead}>A página que procuras não existe ou foi movida.</p>
        <Link href="/">Voltar à página inicial</Link>
      </div>
    </main>
  );
}
