import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import LoggedIn from '@pages/LoggedIn';
import Layout from '@components/layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="loggedin" element={<LoggedIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
