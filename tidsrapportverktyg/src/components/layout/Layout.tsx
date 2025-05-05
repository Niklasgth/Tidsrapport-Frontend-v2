import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@components/layout';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet /> {/* Här genereras allt innehåll från olika sidor */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
