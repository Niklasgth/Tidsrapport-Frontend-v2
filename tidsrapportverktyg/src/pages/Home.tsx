import React from 'react';
import styles from '@styles/home.module.css';
import ButtonLink from '@components/ui/button/ButtonLink';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Välkommen till Tidsrapportverktyget T.R.V!
      </h1>
      <p className={styles.subtitle}>
        Håll koll på din tid med stil och precision.
      </p>
      <ButtonLink to="/loggedin">Börja kartlägga din tid</ButtonLink>
    </div>
  );
};

export default Home;
