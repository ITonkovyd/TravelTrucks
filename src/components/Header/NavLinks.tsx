"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
      >
        Home
      </Link>
      <Link
        href="/catalog"
        className={`${styles.navLink} ${pathname === "/catalog" ? styles.active : ""}`}
      >
        Catalog
      </Link>
    </>
  );
};

export default NavLinks;
