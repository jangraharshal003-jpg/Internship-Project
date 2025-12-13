import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import Sidebar from '../components/Sidebar';
import StatsBar from '../components/StatsBar';
import { useTasks } from '../context/TaskContext';

function DashboardPage({ view = 'all' }) {
  const { filteredTasks, loading, tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const now = new Date();
    return !t.completed && due < now;
  }).length;

  const viewSettings = {
    all: {
      title: 'Tasks',
      subtitle: 'Filter by priority, update status, or add new tasks.',
      emptyMessage: 'No tasks found.',
    },
    overdue: {
      title: 'Overdue Tasks',
      subtitle: 'Tasks that have passed their due date and are still pending.',
      emptyMessage: 'No overdue tasks. Great job staying on track!',
    },
    completed: {
      title: 'Completed Tasks',
      subtitle: 'Review everything you have successfully wrapped up.',
      emptyMessage: 'No completed tasks yet. Keep going!',
    },
    pending: {
      title: 'Pending Tasks',
      subtitle: 'Tasks that are in progress and awaiting completion.',
      emptyMessage: 'No pending tasks. You are all caught up!',
    },
  };

  const { title, subtitle, emptyMessage } = viewSettings[view] || viewSettings.all;

  const displayTasks = filteredTasks.filter((task) => {
    if (view === 'overdue') {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return !task.completed && due < new Date();
    }
    if (view === 'completed') {
      return task.completed;
    }
    if (view === 'pending') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-area">
        <Header />
        <StatsBar total={total} active={active} completed={completed} overdue={overdue} />

        <div className="card">
          <div className="header">
            <div>
              <h2 className="title" style={{ fontSize: 20 }}>
                {title}
              </h2>
              <p className="muted">{subtitle}</p>
            </div>
            <Filters />
          </div>

          {loading && <div className="centered">Loading tasks...</div>}
          {!loading && displayTasks.length === 0 && <div className="centered">{emptyMessage}</div>}

          <div className="grid">
            {displayTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>

        <TaskModal />
      </div>
    </div>
  );
}

export default DashboardPage;

