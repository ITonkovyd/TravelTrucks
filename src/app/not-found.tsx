import Link from "next/link";
import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <h2 className={css.subtitle}>Page Not Found</h2>
      <p className={css.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={`button button--primary ${css.link}`}>
        Go to Home
      </Link>
    </div>
  );
}
