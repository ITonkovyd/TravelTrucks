import css from "./CatalogLayout.module.css";

type CatalogLayoutProps = {
  children: React.ReactNode;
  filters: React.ReactNode;
};

const CatalogLayout = ({ filters, children }: CatalogLayoutProps) => {
  return (
    <section className={css.catalogSection}>
      <div className={`${css.catalogLayout} container`}>
        <aside className={`${css.sidebar}`}>{filters}</aside>
        <div className={css.catalogWrapper}>{children}</div>
      </div>
    </section>
  );
};

export default CatalogLayout;
