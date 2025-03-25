import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {currentYear} CookEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 