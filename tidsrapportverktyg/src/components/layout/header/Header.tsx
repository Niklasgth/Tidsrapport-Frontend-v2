import styles from './Header.module.css';
import TRVImage from '@assets/TRV.png';
import ButtonLink from '@components/ui/button/ButtonLink';
import "@styles/styles.css";


const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <img src={TRVImage} alt="T.R.V logotyp" />
          <h1 className={styles.logo}>Tidsrapporteringsverktyget</h1>
        </div>
        <ul className={styles.menu}>
          <li>
            <ButtonLink to="/">Hem</ButtonLink>
          </li>
          <li>
            <ButtonLink to="/loggedin">Logga In</ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
