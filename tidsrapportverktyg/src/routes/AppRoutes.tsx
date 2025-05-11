import { Route, Routes } from 'react-router-dom';

// Sidor
import Home from '@pages/Home';               // Startsida
import LoggedIn from '@pages/LoggedIn';       // Sida efter inloggning (eller simulering av det)

// Layout-komponent som omsluter alla routes
import Layout from '@components/layout/Layout';

// Definierar alla routes i applikationen
const AppRoutes = () => {
  return (
    <Routes>
      {/* All routing ligger under gemensam layout */}
      <Route path="/" element={<Layout />}>
        
        {/* Startsidan visas vid "/" */}
        <Route index element={<Home />} />

        {/* Inloggad vy visas vid "/loggedin" */}
        <Route path="loggedin" element={<LoggedIn />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
