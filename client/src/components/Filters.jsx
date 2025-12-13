import React from 'react';
import { useTasks } from '../context/TaskContext';

function Filters() {
  const { priorityFilter, setPriorityFilter, completedTasks, activeTasks } = useTasks();

  const options = ['all', 'high', 'medium', 'low'];

  return (
    <div className="filters">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`btn ghost ${priorityFilter === opt ? 'active' : ''}`}
          onClick={() => setPriorityFilter(opt)}
          style={{ padding: '8px 12px' }}
        >
          {opt === 'all' ? 'All' : opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
      <div className="badges" style={{ marginLeft: 'auto' }}>
        <span className="pill">Active: {activeTasks.length}</span>
        <span className="pill">Completed: {completedTasks.length}</span>
      </div>
    </div>
  );
}

export default Filters;

