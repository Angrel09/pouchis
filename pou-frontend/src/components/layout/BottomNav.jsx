import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Gamepad2, Users, ScrollText } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: <Home />, label: 'Inicio' },
    { to: '/shop', icon: <ShoppingBag />, label: 'Tienda' },
    { to: '/games', icon: <Gamepad2 />, label: 'Juegos' },
    { to: '/quests', icon: <ScrollText />, label: 'Misiones' },
    { to: '/social', icon: <Users />, label: 'Social' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-2 z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-primary scale-110' : 'text-muted hover:text-text'
            }`
          }
        >
          <div className="w-6 h-6">{item.icon}</div>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
