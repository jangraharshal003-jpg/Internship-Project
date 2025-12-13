import React from 'react';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TaskContext';

function Header() {
  const { user, logout } = useUser();
  const { openCreateModal, activeTasks } = useTasks();

  return (
    <header className="header">
      <div>
        <p className="muted" style={{ margin: 0 }}>
          👋 Hey {user?.name || user?.email || 'there'}
        </p>
        <h1 className="title" style={{ marginTop: 4 }}>
          Stay on track with TaskFlow
        </h1>
        <p className="muted">{user?._id ? `${activeTasks.length} active task(s) to focus on` : 'Please log in to manage tasks'}</p>
      </div>
      <div className="header-actions">
        <button className="btn ghost" type="button" onClick={logout}>
          Logout
        </button>
        <button className="btn primary" type="button" onClick={openCreateModal}>
          + Add task
        </button>
      </div>
    </header>
  );
}

export default Header;

