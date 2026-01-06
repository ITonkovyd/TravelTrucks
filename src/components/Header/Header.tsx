import Link from "next/link";
import NavLinks from "./NavLinks";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Link href="/">
          <svg className={styles.logo}>
            <use href="/icons/sprite.svg#header_logo" />
          </svg>
        </Link>

        <div className={styles.navLinksWrapper}>
          <div className={styles.navLinks}>
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
