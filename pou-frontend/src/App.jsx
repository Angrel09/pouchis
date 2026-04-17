import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import { SocketProvider } from './context/SocketContext';
import AppShell from './components/layout/AppShell';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import MinigamesPage from './pages/MinigamesPage';
import SocialPage from './pages/SocialPage';
import QuestsPage from './pages/QuestsPage';

// Placeholders para nuevas páginas
const ShopPage = () => <div className="p-4"><h1 className="text-2xl font-fredoka">Tienda</h1><p className="text-muted">Próximamente...</p></div>;

function App() {
  return (
    <PetProvider>
      <SocketProvider>
        <Router>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/games" element={<MinigamesPage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/quests" element={<QuestsPage />} />
            </Routes>
            <BottomNav />
          </AppShell>
        </Router>
      </SocketProvider>
    </PetProvider>
  );
}

export default App;
