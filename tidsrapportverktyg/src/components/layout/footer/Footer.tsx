import styles from './Footer.module.css';
import '@styles/styles.css';
 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Din tid är värdefull – vi hjälper dig att hålla koll på den.</p>
      <p className={styles.copyright}>© 2025 T.R.V – Tidsrapporteringsverktyget</p>
    </footer>
  );
};

export default Footer;
