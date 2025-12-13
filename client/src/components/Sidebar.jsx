import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const links = [
  { label: 'Dashboard', path: '/' },
  { label: 'Overdue', path: '/overdue' },
  { label: 'Completed', path: '/completed' },
  { label: 'Pending', path: '/pending' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  return (
    <aside className="sidebar">
      <div className="logo">⚡ TaskFlow</div>
      <div className="nav">
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              type="button"
              className={active ? 'active' : ''}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 30, fontSize: 13, color: '#94a3b8' }}>
        Signed in as <br />
        <strong style={{ color: '#e2e8f0' }}>{user?.name || user?.email || 'Guest'}</strong>
      </div>
    </aside>
  );
}

export default Sidebar;

